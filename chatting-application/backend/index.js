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
  try {
    const { senderId, receiverId, message } = req.body;
    if (senderId === receiverId) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    const requestExists = receiver.requests.some(
      (req) => req.from.toString() === senderId
    );

    if (requestExists) {
      return res.status(400).json({ message: "Request already sent" });
    }

    receiver.requests.push({
      from: senderId,
      message: message || "Sent you a friend request"
    });

    await receiver.save();
    res.status(200).json({ message: "Request sent successfully." });

  } catch (error) {
    console.log("Send request error", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getrequests/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("requests.from", "name email image");
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

    res.status(200).json({ message: "Request accepted successfully" })
  } catch (error) {
    console.log("Accept request api error - ", error);
    res.status(500).json({ message: "Server error" })
  }
})

app.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const users = await User.findById(userId).populate(
      'friends',
      'name email image',
    );

    res.json(users.friends);
  } catch (error) {
    console.log('Error fetching user', error);
  }
});


const http = require('http').createServer(app);
const io = require("socket.io")(http);

const http = require('http').createServer(app);

const io = require('socket.io')(http);

//{"userId" : "socket ID"}

const userSocketMap = {};

io.on('connection', socket => {
  console.log('a user is connected', socket.id);

  const userId = socket.handshake.query.userId;

  console.log('userid', userId);

  if (userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  console.log('user socket data', userSocketMap);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
  });

  socket.on('sendMessage', ({senderId, receiverId, message}) => {
    const receiverSocketId = userSocketMap[receiverId];

    console.log('receiver Id', receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', {
        senderId,
        message,
      });
    }
  });
});

http.listen(3000, () => {
  console.log('Socket.IO running on port 3000');
});

app.post('/sendMessage', async (req, res) => {
  try {
    const {senderId, receiverId, message} = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      console.log('emitting recieveMessage event to the reciver', receiverId);
      io.to(receiverSocketId).emit('newMessage', newMessage);
    } else {
      console.log('Receiver socket ID not found');
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('ERROR', error);
  }
});

app.get('/messages', async (req, res) => {
  try {
    const {senderId, receiverId} = req.query;

    const messages = await Message.find({
      $or: [
        {senderId: senderId, receiverId: receiverId},
        {senderId: receiverId, receiverId: senderId},
      ],
    }).populate('senderId', '_id name');

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error', error);
  }
});