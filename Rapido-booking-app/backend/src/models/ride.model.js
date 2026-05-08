const { latitudeKeys } = require('geolib');
const mongoose = require('mongoose');
const z = require('zod');

const rideZodSchema = z.object({
  userId: z.string().min(1, "User id is required"),
  driverId: z.string().optional(),
  pickupLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).required("Pickup location is required"),
  dropLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).required("Drop location is required"),
  status: z.enum(['pending', 'accepted', 'in_progress', 'completed', 'cancelled']).default('pending'),
  createdAt: z.date().optional()
})

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driveId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  pickupLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  dropLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: { type: String, enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
})

const Ride = mongoose.model('Ride', rideSchema);

rideSchema.pre('save', async function (next) {
  try {
    await rideZodSchema.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
})

module.exports = { Ride, rideZodSchema }