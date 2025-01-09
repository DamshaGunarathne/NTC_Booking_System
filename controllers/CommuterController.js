const Schedule = require('../models/ScheduleModel');
const Booking = require('../models/BookingModel');

exports.searchBuses = async (req, res) => {
    try {
        console.log("Query Params:", req.query);

        const { departurePoint, arrivalPoint, date } = req.query;

        // Validate required parameters
        if (!departurePoint || !arrivalPoint || !date) {
            console.error("Missing query parameters:", { departurePoint, arrivalPoint, date });
            return res.status(400).json({
                message: "Missing required query parameters: departurePoint, arrivalPoint, or date.",
            });
        }

        // Parse the date to ensure consistency with database
        const searchDate = new Date(date).toISOString().slice(0, 10);
        console.log("searchDate : ", searchDate)

        // Query to find matching schedules
        const buses = await Schedule.find({
            $and: [
                {
                    $or: [
                        { 
                            departurePoint: departurePoint, 
                            arrivalPoint: arrivalPoint 
                        }
                    ]
                },
                { 
                    'scheduleValid.startDate': { $lte: searchDate },
                    'scheduleValid.endDate': { $gte: searchDate }
                },
                { isActive: true }
            ]
        });

        // Log the results
        console.log("Matching Buses:", buses);

        // Return matching buses
        res.status(200).json(buses);
    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).json({
            message: "An error occurred while fetching buses.",
            error: error.message,
        });
    }
};

// Add a new bus booking
exports.addBooking = async (req, res) => {
    const { bookingNumber, userName, seatCount, bookingDate, scheduleToken, bookingToken } = req.body;
    console.log("Req body:", req.body);

    try {
        // Find the schedule by token
        const schedule = await Schedule.findOne({ scheduleToken: scheduleToken });

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }

        // Check if there are enough seats available
        if (schedule.bus.availableSeats < seatCount) {
            return res.status(400).json({ message: 'Not enough seats available.' });
        }

        // Create the new booking
        const newBooking = await Booking.create({
            bookingNumber,
            userName,
            seatCount,
            bookingDate,
            scheduleToken,
            bookingToken,
        });

        // Update the schedule's available seats
        schedule.bus.availableSeats -= seatCount;
        await schedule.save();

        // Return success response
        res.status(201).json({ message: 'Bus booked successfully', booking: newBooking });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Failed to book', error: error.message });
    }
};