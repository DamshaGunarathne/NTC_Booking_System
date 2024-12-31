const Reservation = require('../models/Reservation');
const Schedule = require('../models/Schedule');

exports.reserveSeat = async (req, res) => {
  try {
    const { scheduleId, seatNumber } = req.body;

    // Check if the schedule exists
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }

    // Check if the seat is already reserved
    const existingReservation = await Reservation.findOne({
      schedule: scheduleId,
      seatNumber,
    });

    if (existingReservation) {
      return res.status(409).json({ message: 'Seat is already reserved.' });
    }

    // Create a new reservation
    const reservation = await Reservation.create({
      schedule: scheduleId,
      seatNumber,
      commuter: req.user.id,
    });

    res.status(201).json({
      message: 'Reservation successfully created.',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { seatNumber } = req.body;

    // Find the reservation
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Check if the seat is already reserved
    const existingReservation = await Reservation.findOne({
      schedule: reservation.schedule,
      seatNumber,
    });

    if (existingReservation && existingReservation.id !== reservationId) {
      return res.status(409).json({ message: 'Seat is already reserved.' });
    }

    reservation.seatNumber = seatNumber;
    await reservation.save();

    res.status(200).json({
      message: 'Reservation updated successfully.',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByIdAndDelete(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    res.status(200).json({ message: 'Reservation successfully canceled.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
