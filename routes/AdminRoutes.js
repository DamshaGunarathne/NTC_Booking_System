const express = require("express");
const auth = require("../middleware/authMiddleware");
const Route = require("../models/route");
const Bus = require("../models/bus");
const User = require("../models/UserModel");

const router = express.Router();

// Add a new route
router.post("/routes", auth("Admin"), async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).send(route);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Add a new bus
router.post("/buses", auth("Admin"), async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).send(bus);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Add a new operator
router.post("/operators", auth("Admin"), async (req, res) => {
  try {
    const operator = new User({ ...req.body, role: "Operator" });
    await operator.save();
    res.status(201).send(operator);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
