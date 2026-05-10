const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, UserZodSchema } = require('./models/user.model');

app.use(cors({
  origin: ['http://10.169.128.7:19006', 'http://10.169.128.7:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
  next();
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        location: user.location,
        ridesDone: user.ridesDone
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error while logging in." });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const validationData = UserZodSchema.parse(req.body);
    const { email, password, phone, location } = validationData;

    const existingUser = await User.findOne({ email }); // ✅ fixed
    if (existingUser) {
      return res.status(400).json({ message: "User already exists in database" }); // ✅ return added
    }

    const newUser = new User({
      email,
      password,
      phone,
      profilePic: validationData.profilePic || '',
      location,
      ridesDone: validationData.ridesDone
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET_KEY);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {                   // ✅ user object added
        id: newUser._id,
        email: newUser.email,
        phone: newUser.phone,
        location: newUser.location,
        ridesDone: newUser.ridesDone
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error while registering user." });
  }
});

module.exports = app;