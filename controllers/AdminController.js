const Route = require('../models/Route'); // Example Model
 
// Create a new route
const createRoute = async (req, res, next) => {
    try {
        const { routeName, origin, destination, schedule } = req.body;
        const newRoute = new Route({ routeName, origin, destination, schedule });
        await newRoute.save();
        res.status(201).json({ success: true, route: newRoute });
    } catch (error) {
        next(error);
    }
};
 
// Get all routes
const getAllRoutes = async (req, res, next) => {
    try {
        const routes = await Route.find();
        res.status(200).json({ success: true, routes });
    } catch (error) {
        next(error);
    }
};
 
module.exports = {
    createRoute,
    getAllRoutes,
};