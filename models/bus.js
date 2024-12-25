const mongoose = require("mongoose");
 
const busSchema = new mongoose.Schema({
  operatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  capacity: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  schedule: [{ type: Date, required: true }], // Array of scheduled trips
});
 
module.exports = mongoose.model("Bus", busSchema);