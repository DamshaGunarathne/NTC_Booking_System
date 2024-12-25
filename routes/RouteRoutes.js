const express = require('express');
const { addRoute, getAllRoutes } = require('../controllers/RouteController');
const authMiddleware = require('../middleware/authMiddleware'); // Optional
 
const router = express.Router();
 
router.post('/', authMiddleware, addRoute); // Protected route
router.get('/', authMiddleware, getAllRoutes);
 
module.exports = router;
