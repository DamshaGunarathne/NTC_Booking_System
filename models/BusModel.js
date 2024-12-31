const mongoose = require("mongoose");
 
const busSchema = new mongoose.Schema({
  operatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  busNumber: { type: String, required: true },
  bustype: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  driverName: { type: String },
  conductorName: { type: String },
  availableSeats: { type: Number, required: true },
  schedule: [{ type: String, required: true }], // Array of scheduled trips
});
 
module.exports = mongoose.model("Bus", busSchema);