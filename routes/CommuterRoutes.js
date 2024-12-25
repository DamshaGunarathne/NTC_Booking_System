const express = require("express");
const auth = require("../middleware/authMiddleware");
const Route = require("../models/route");
const Reservation = require("../models/reservation");
 
const router = express.Router();
 
// Search routes
router.get("/routes", auth("Commuter"), async (req, res) => {
  try {
    const routes = await Route.find();
    res.send(routes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
// Book a seat
router.post("/reservations", auth("Commuter"), async (req, res) => {
  try {
    const reservation = new Reservation({ ...req.body, commuterId: req.user.id });
    await reservation.save();
    res.status(201).send(reservation);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
 
module.exports = router;