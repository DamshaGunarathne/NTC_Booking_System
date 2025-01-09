const Schedule = require('../models/ScheduleModel');

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

const getBusesByOperator = async (req, res, next) => {
    try {
        const { operatorId } = req.params;
        const buses = await Bus.find({ operatorId });
        res.status(200).json({ success: true, buses });
    } catch (error) {
        next(error);
    }
};


// Add a schedule
const addSchedule = async (req, res, next) => {
    try {
        const existingSchedule = await Schedule.findOne({ scheduleToken:  req.body.scheduleToken});
        if(existingSchedule === null) {
            console.log("Request : ", req.body);
            const newSchedule = await Schedule.create({
                route: req.body.route,
                bus: req.body.bus,
                departurePoint: req.body.departurePoint,
                departureTime: req.body.departureTime,
                arrivalPoint: req.body.arrivalPoint,
                arrivalTime: req.body.arrivalTime,
                stops: req.body.stops,
                scheduleValid: req.body.scheduleValid,
                scheduleToken: req.body.scheduleToken,
                isActive: req.body.isActive
              });
              if(newSchedule != null) {
                res.status(201).json({ message: 'Schedule added successfully' });
              }
              else {
                res.status(201).json({ message: 'Failed to add schedule' });
              }
        }
        else {
            res.status(400).json({ message: 'exsisting schedule token' });
        }
    } catch (error) {
        next(error);
    }
};

// Update a schedule
const updateSchedule = async (req, res, next) => {
    try {
        // Find the existing schedule by its scheduleToken
        const existingSchedule = await Schedule.findOne({ scheduleToken: req.params.scheduleToken });

        if (!existingSchedule) {
            return res.status(404).json({ message: 'Cannot find schedule with the provided token.' });
        }

        // Initialize updateData
        const updateData = {};

        // Dynamically update fields if present in the request body
        if (req.body.departurePoint) updateData.departurePoint = req.body.departurePoint;
        if (req.body.departureTime) updateData.departureTime = req.body.departureTime;
        if (req.body.arrivalPoint) updateData.arrivalPoint = req.body.arrivalPoint;
        if (req.body.arrivalTime) updateData.arrivalTime = req.body.arrivalTime;
        if (req.body.stops) updateData.stops = req.body.stops;

        // Check if there are any fields to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No valid fields to update." });
        }

        // Update the schedule in the database
        const updatedSchedule = await Schedule.updateOne(
            { scheduleToken: req.params.scheduleToken }, // Match the schedule by token
            updateData // Fields to update
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: "Failed to update schedule." });
        }

        // Fetch the updated document for response
        const refreshedSchedule = await Schedule.findOne({ scheduleToken: req.params.scheduleToken });

        // Respond with the updated schedule
        return res.status(200).json({
            message: "Schedule updated successfully.",
            schedule: refreshedSchedule,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a schedule
const deleteSchedule = async (req, res, next) => {
    try {
        // Find the schedule by its scheduleToken
        const existingSchedule = await Schedule.findOne({ scheduleToken: req.params.scheduleToken });

        if (!existingSchedule) {
            return res.status(404).json({ message: 'Schedule not found with the provided token.' });
        }

        // Delete the schedule
        await Schedule.deleteOne({ scheduleToken: req.params.scheduleToken });

        // Respond with a success message
        return res.status(200).json({
            message: "Schedule deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

// Get schedules by operator
const getSchedulesByOperator = async (req, res, next) => {
    try {
        // Placeholder logic
        res.status(200).json({ schedules: [] });
    } catch (error) {
        next(error);
    }
};

// Update seats for a schedule
const updateSeats = async (req, res, next) => {
    try {
        // Placeholder logic
        res.status(200).json({ message: 'Seats updated successfully' });
    } catch (error) {
        next(error);
    }
};

// Get seat availability
const getSeatAvailability = async (req, res, next) => {
    try {
        // Placeholder logic
        res.status(200).json({ seats: [] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addBus,
    getBusesByOperator,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getSchedulesByOperator,
    updateSeats,
    getSeatAvailability,
};
