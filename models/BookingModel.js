const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingNumber: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    seatCount: { type: Number, required: true },
    bookingDate: { type: Date, required: true },
    scheduleToken: { type: String, required: true },
    bookingToken: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);