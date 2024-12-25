const Bus = require('../models/Bus'); // Example Model
 
// Add a new bus
const addBus = async (req, res, next) => {
    try {
        const { busName, route, seats, operatorId } = req.body;
        const newBus = new Bus({ busName, route, seats, operatorId });
        await newBus.save();
        res.status(201).json({ success: true, bus: newBus });
    } catch (error) {
        next(error);
    }
};
 
// Get all buses for an operator
const getBusesByOperator = async (req, res, next) => {
    try {
        const { operatorId } = req.params;
        const buses = await Bus.find({ operatorId });
        res.status(200).json({ success: true, buses });
    } catch (error) {
        next(error);
    }
};
 
module.exports = {
    addBus,
    getBusesByOperator,
};