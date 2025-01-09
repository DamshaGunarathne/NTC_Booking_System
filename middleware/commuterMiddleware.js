const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Replace with your actual User model

const commuterMiddleware = async (req, res, next) => {
    try {
        // Extract token from the request header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization token is required." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the user has the role of "commuter"
        if (user.role !== 'Commuter') {
            return res.status(403).json({ message: "Access denied. Only commuters can access this resource." });
        }

        // Attach the user to the request object for downstream use
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in commuterMiddleware:", error.message);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

module.exports = commuterMiddleware;
