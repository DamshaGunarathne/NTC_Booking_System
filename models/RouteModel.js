// models/Route.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  startingPoint: { type: String, required: true },
  endingPoint: { type: String, required: true },
  distance: { type: String, required: true },
  // schedule: { type: String, required: true },
  // stops: [
  //   {
  //     stopName: {
  //       type: String,
  //       required: true, // Name of the stop (e.g., "Midtown")
  //     },
  //     stopTime: {
  //       type: String, // Estimated time for the stop (optional)
  //     },
  //   },
  // ],
  isActive: {
    type: Boolean,
    default: true, // Default to true if not specified
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
}
);

module.exports = mongoose.model('Route', routeSchema);
