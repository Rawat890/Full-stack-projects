const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  image:{
    type: String,
  },
  requests:[{
    from:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true
    },
    status:{
      type: String,
      default: "pending",
      enum:["pending","accepted","rejected"]
    }
  }
  ],
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
})

const User = mongoose.model("User", userSchema);

module.exports = User;