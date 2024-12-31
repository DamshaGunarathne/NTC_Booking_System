const express = require('express');
const router = express.Router();
const { searchBuses } = require('../controllers/CommuterController');
const authMiddleware = require('../middleware/authMiddleware');
const commuterMiddleware = require('../middleware/commuterMiddleware');

/**
 * @swagger
 * /api/commuter/searchbus:
 *   get:
 *     summary: Find available buses based on departure and arrival locations, along with travel date.
 *     tags: [Commuters]
 *     parameters:
 *       - in: query
 *         name: departurePoint
 *         schema:
 *           type: string
 *         required: true
 *         description: Starting point for the journey.
 *       - in: query
 *         name: arrivalPoint
 *         schema:
 *           type: string
 *         required: true
 *         description: Destination for the trip.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: |
 *           Date of travel in the format YYYY-MM-DD. Example: 2024-12-30
 *     responses:
 *       200:
 *         description: List of buses matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   route:
 *                     type: object
 *                     properties:
 *                       routeNumber:
 *                         type: string
 *                         example: "R458"
 *                       routeName:
 *                         type: string
 *                         example: "Downtown to Uptown"
 *                   bus:
 *                     type: object
 *                     properties:
 *                       registrationNumber:
 *                         type: string
 *                         example: "ABC9876"
 *                       operatorName:
 *                         type: string
 *                         example: "Cityline Express"
 *                       busType:
 *                         type: string
 *                         example: "Luxury"
 *                       ticketPrice:
 *                         type: number
 *                         example: 1200
 *                       capacity:
 *                         type: number
 *                         example: 50
 *                       availableSeats:
 *                         type: number
 *                         example: 25
 *                   schedule:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         departurePoint:
 *                           type: string
 *                           example: "Main Terminal"
 *                         departureTime:
 *                           type: string
 *                           example: "2024-12-30T07:30:00Z"
 *                         arrivalPoint:
 *                           type: string
 *                           example: "Central Station"
 *                         arrivalTime:
 *                           type: string
 *                           example: "2024-12-30T09:30:00Z"
 *                         stops:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "Midtown Stop"
 *       400:
 *         description: Required query parameters are missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide valid departurePoint, arrivalPoint, and date."
 *       404:
 *         description: No buses were found matching the given criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No matching buses found for the selected route and date."
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve bus details due to a server error."
 *                 error:
 *                   type: string
 *                   example: "Database connection failed."
 */
router.get(
    '/searchbus',
    authMiddleware, // Middleware to verify user authentication
    commuterMiddleware, // Middleware to verify the user has a commuter role
    searchBuses // Controller function to handle the request
);

module.exports = router;
