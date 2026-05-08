const mongoose = require('mongoose');
require("dotenv").config();
const dns = require('node:dns').promises;
dns.setServers(['8.8.8.8', '1.1.1.1'])

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Backend connected succesfully")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb();