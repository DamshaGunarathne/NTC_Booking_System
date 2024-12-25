const express = require("express");
const auth = require("../middleware/authMiddleware");
const Bus = require("../models/bus");
const Reservation = require("../models/reservation");
 
const router = express.Router();
 
// View buses assigned to operator
router.get("/buses", auth("Operator"), async (req, res) => {
  try {
    const buses = await Bus.find({ operatorId: req.user.id });
    res.send(buses);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
// Manage reservations for operator's buses
router.get("/reservations", auth("Operator"), async (req, res) => {
  try {
    const reservations = await Reservation.find({ busId: { $in: req.user.buses } });
    res.send(reservations);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
module.exports = router;