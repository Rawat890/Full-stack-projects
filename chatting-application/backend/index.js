const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require("crypto"); //used to created the token or secret key
const app = express();
const PORT = 6000;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://rohanrawat7508:Rohan123@cluster0.oroajyg.mongodb.net/').then(() => {
  console.log("Connected to database")
})

app.listen(PORT, () => {
  console.log("Server running on port - ", PORT)
})

const User = require("./models/user");
const Message = require("./models/message");

//end points - api

app.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;

  const newUser = new User({ name, email, password, image })

  newUser.save().then(() => {
    res.status(200).json({ message: "User created successfully" })
  }).catch((error) => {
    res.status(500).json({ message: "Error while registering user" })
  })
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" })
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" })
    }

    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error while login - ", error)
    res.status(500).json({ message: "Error while logging in" })
  }
})

//This endpoint returns all users except the current user. $ne = This means "not equal" in MongoDB.
app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } })
    res.json(users)
  } catch (error) {
    console.log("User list error - ", error)
  }
})

app.post("/sendrequest", async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" })
  }
  receiver.requests.push({ from: senderId, message });
  await receiver.save();
  res.status(200).json({ message: "Request sent successfully." })
})

app.get("/getrequests/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("requests.from", "name email");
    if (user) {
      res.json(user.requests)
    } else {
      res.status(400).json({ message: "User not found" })
    }

  } catch (error) {
    console.log(error)
  }
})

app.post("/acceptrequest", async (req, res) => {
  try {
    const { userId, requestId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    //update user array to remove the request that is accepted
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { requests: { from: requestId } }
    }, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ message: "Request not found" })
    }

    await User.findByIdAndUpdate(userId, {
      $push: { friends: requestId }
    })

    const friendUser = await User.findByIdAndUpdate(requestId, {
      $push: { friends: userId }
    })

    if (!friendUser) {
      return res.status(404).json({ message: "Friend not found" })
    }

    res.status(200).json({message: "Request accepted successfully"})
  } catch (error) {
    console.log("Accept request api error - ", error);
    res.status(500).json({ message: "Server error" })
  }
})