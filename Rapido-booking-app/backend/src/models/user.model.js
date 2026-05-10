const mongoose = require('mongoose');
const z = require('zod');

const UserZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  profilePic: z.string().optional(),
  location: z.object({
    latitude: z.number().min(-90).max(90),
    latitude: z.number().min(-100).max(100),
    address: z.string(),
  }),
  ridesDone: z.number().nonnegative().min(0).default(0),
});


const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, required: false }
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  profilePic: { type: String, default: '' },
  location: { type: locationSchema, required: false },
  ridesDone: { type: Number, default: 0 }
})

userSchema.pre('save', async function (next) {
  try {
    await UserZodSchema.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
})
const User = mongoose.model('User', userSchema);
module.exports = { User, UserZodSchema }