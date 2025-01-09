const express = require('express');
const router = express.Router();
const { searchBuses, addBooking } = require('../controllers/CommuterController');
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

/**
 * @swagger
 * /api/commuter/bookbus:
 *   post:
 *     summary: Book a bus for transportation
 *     tags: [Commuters]
 *     security:
 *       - bearerAuth: []  # Authorization using Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingNumber
 *               - userName
 *               - seatCount
 *               - bookingDate
 *               - scheduleToken
 *               - bookingToken
 *             properties:
 *               bookingNumber:
 *                 type: string
 *                 description: Unique booking identifier.
 *               userName:
 *                 type: string
 *                 description: Name of the user making the booking.
 *               seatCount:
 *                 type: number
 *                 description: Number of seats being booked.
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the booking.
 *               scheduleToken:
 *                 type: string
 *                 description: Unique identifier for the schedule being booked.
 *               bookingToken:
 *                 type: string
 *                 description: Unique identifier for the booking.
 *     responses:
 *       201:
 *         description: The booking was successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Booking successfully created."
 *                 booking:
 *                   type: object
 *                   properties:
 *                     bookingNumber:
 *                       type: string
 *                       example: "B12345"
 *                     userName:
 *                       type: string
 *                       example: "John Doe"
 *                     seatCount:
 *                       type: number
 *                       example: 3
 *                     bookingDate:
 *                       type: string
 *                       example: "2025-01-08T10:00:00Z"
 *                     scheduleToken:
 *                       type: string
 *                       example: "R001AB20250108-CityRoute"
 *                     bookingToken:
 *                       type: string
 *                       example: "BK12345"
 *       400:
 *         description: Invalid input data provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Provided data is incomplete or invalid."
 *       401:
 *         description: Authorization error (e.g., missing token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. Authentication token is invalid."
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unable to process the booking. Please try again later."
 */
router.post(
    '/bookbus',
    authMiddleware, // Middleware to verify user authentication
    commuterMiddleware, // Middleware to verify the user has a commuter role
    addBooking // Controller function to handle the request
);

module.exports = router;
