// models/ScheduleModel.js
const mongoose = require('mongoose');
const Route = require('./RouteModel'); // Import the Route model
const Bus = require('./BusModel'); // Import the Bus model

const scheduleSchema = new mongoose.Schema({
  route: {
    routeNumber: {
      type: String,
      required: true, // The route number is required
    },
    routeName: {
      type: String,
      required: true, // The route name is required
    },
  },
  bus: {
    registrationNumber: {
      type: String,
      required: true, // Bus registration number is required
    },
    operatorName: {
      type: String,
      required: true, // Operator's name is required
    },
    busType: {
      type: String,
      required: true, // Type of the bus is required (e.g., Luxury, Semi-Luxury)
    },
    ticketPrice: {
      type: Number,
      required: true, // Ticket price is required
    },
    capacity: {
      type: Number,
      required: true, // Bus capacity is required
    },
    availableSeats: {
      type: Number,
      required: true, // Number of available seats is required
    },
  },
  schedule: [
    {
      departurePoint: { type: String, required: true }, // Starting point of the trip
      departureTime: { type: String, required: true }, // Departure time from the starting point
      arrivalPoint: { type: String, required: true }, // Destination point of the trip
      arrivalTime: { type: String, required: true }, // Arrival time at the destination
      stops: [{ type: String }], // List of stops along the route
    },
  ],
  scheduleValid: {
    startDate: {
      type: Date,
      required: true, // Start date of schedule validity is required
    },
    endDate: {
      type: Date,
      required: true, // End date of schedule validity is required
    },
  },
  isActive: {
    type: Boolean,
    default: true, // Schedule is active by default
  },
  scheduleToken: {
    type: String,
    unique: true, // Each schedule must have a unique token
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Middleware to validate the route and generate the schedule token before saving
scheduleSchema.pre('save', async function (next) {
  // Check if the route exists and is active
  const routeExists = await Route.findOne({
    routeNumber: this.route.routeNumber,
    isActive: true, // Ensure the route is in active status
  });
  if (!routeExists) {
    return next(new Error('The selected route is either unavailable or inactive. Please verify.'));
  }

  // Generate a unique schedule token if it is not already set
  if (!this.scheduleToken) {
    // Extract route number and name, removing spaces from the route name
    const routeNumber = this.route.routeNumber;
    const routeName = this.route.routeName.replace(/\s+/g, '');

    // Extract the bus registration number
    const registrationNumber = this.bus.registrationNumber;

    // Format the schedule date as YYYYMMDD from the departure time
    const scheduleDate = new Date(this.schedule[0].departureTime)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');

    // Combine details to form a unique schedule token
    this.scheduleToken = `${routeNumber}${registrationNumber}${scheduleDate}-${routeName}`;
  }

  next();
});

module.exports = mongoose.model('Schedule', scheduleSchema);
