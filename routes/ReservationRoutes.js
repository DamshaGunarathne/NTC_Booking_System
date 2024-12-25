const express = require('express');
const { viewAllReservations, cancelReservation } = require('../controllers/ReservationController');
const authMiddleware = require('../middleware/authMiddleware'); // Optional
 
const router = express.Router();
 
router.get('/', authMiddleware, viewAllReservations); // Protected route
router.delete('/:reservationId', authMiddleware, cancelReservation);
 
module.exports = router;