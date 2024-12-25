const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  commuterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumber: { type: Number, required: true },
  status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
  paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

// Use the existing model if it exists, or create a new one
const Reservation =
  mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
