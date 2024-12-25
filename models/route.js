const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  start: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
});

// Use the existing model if it exists, or create a new one
const Route = mongoose.models.Route || mongoose.model("Route", routeSchema);

module.exports = Route;
