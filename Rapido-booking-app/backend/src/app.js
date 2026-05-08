const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserZodSchema = require('./models/user.model')
const User = require('./models/user.model')

app.use(cors({
  origin: ['http://localhost:19006', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${JSON.stringify(req.body)}`)
  next();
})

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).json({
        message: "Invalid credentials"
      })
    }

    await newUser.save();
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET_KEY)
    res.status(201).json({
      message: "user logged in successfully",
      token,
      userId: user._id,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        location: user.location,
        ridesDone: user.ridesDone
      }
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while registering user."
    })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const validationData = UserZodSchema.parse(req.body);
    const { email, password, phone, location } = validationData;

    const existingUser = await UserZodSchema.User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "user already exists in database"
      })
    }

    const newUser = new User({
      email,
      passowrd,
      phone,
      profilePic: validationData.profilePic || '',
      location,
      ridesDone: validationData.ridesDone
    })

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET_KEY)
    res.status(201).json({
      message: "user registered successfully in backend",
      token,
      userId: newUser._id
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while registering user."
    })
  }
})

module.exports = app;