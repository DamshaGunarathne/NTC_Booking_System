const Reservation = require('../models/Reservation');
 
// View all reservations
const viewAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().populate('routeId commuterId');
        res.status(200).json({ success: true, reservations });
    } catch (error) {
        next(error);
    }
};
 
// Cancel a reservation
const cancelReservation = async (req, res, next) => {
    try {
        const { reservationId } = req.params;
        await Reservation.findByIdAndDelete(reservationId);
        res.status(200).json({ success: true, message: 'Reservation canceled successfully' });
    } catch (error) {
        next(error);
    }
};
 
module.exports = {
    viewAllReservations,
    cancelReservation,
};