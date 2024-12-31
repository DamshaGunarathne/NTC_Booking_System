const Schedule = require('../models/ScheduleModel');

exports.searchBuses = async (req, res) => {
    try {
        // Debug log to inspect incoming query parameters
        console.log("Query Params:", req.query);

        const { departurePoint, arrivalPoint, date } = req.query;

        // Validate required parameters
        if (!departurePoint || !arrivalPoint || !date) {
            console.error("Missing query parameters:", { departurePoint, arrivalPoint, date });
            return res.status(400).json({
                message: "Missing required query parameters: departurePoint, arrivalPoint, or date.",
            });
        }

        // Prepare filters
        const filterCriteria = {
            schedule: {
                $elemMatch: {
                    departurePoint: departurePoint.trim().toLowerCase(),
                    arrivalPoint: arrivalPoint.trim().toLowerCase(),
                },
            },
            "scheduleValid.startDate": { $lte: new Date(date) },
            "scheduleValid.endDate": { $gte: new Date(date) },
            isActive: true,
        };

        console.log("Filter Criteria:", filterCriteria);

        // Fetch buses
        const buses = await Schedule.find(filterCriteria).lean();

        console.log("Fetched Buses:", buses);

        // Handle no results found
        if (!buses || buses.length === 0) {
            console.warn("No buses found for the specified criteria");
            return res.status(404).json({ message: "No buses found for the specified criteria." });
        }

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
