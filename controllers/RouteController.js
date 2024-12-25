const Route = require('../models/Route');
 
// Add a new route
const addRoute = async (req, res, next) => {
    try {
        const { routeName, origin, destination, schedule } = req.body;
        const newRoute = new Route({ routeName, origin, destination, schedule });
        await newRoute.save();
        res.status(201).json({ success: true, route: newRoute });
    } catch (error) {
        next(error);
    }
};
 
// View all routes
const getAllRoutes = async (req, res, next) => {
    try {
        const routes = await Route.find();
        res.status(200).json({ success: true, routes });
    } catch (error) {
        next(error);
    }
};
 
module.exports = {
    addRoute,
    getAllRoutes,
};