const express = require('express');
const { addRoute, addBus, getRoutes, getBuses } = require('../controllers/AdminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/admin/routes:
 *   post:
 *     summary: Add a new transportation route
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []  # Authorization using Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - routeNumber
 *               - startingPoint
 *               - endingPoint
 *               - distance
 *             properties:
 *               routeNumber:
 *                 type: string
 *                 description: Identifier for the route (e.g., R001, R002).
 *               startingPoint:
 *                 type: string
 *                 description: Name of the starting location.
 *                 example: "Central Station"
 *               endingPoint:
 *                 type: string
 *                 description: Name of the final destination.
 *                 example: "East Terminal"
 *               distance:
 *                 type: string
 *                 description: Total length of the route in kilometers.
 *                 example: "150km"
 *     responses:
 *       201:
 *         description: The route was successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New route successfully created."
 *                 route:
 *                   type: object
 *                   properties:
 *                     routeNumber:
 *                       type: string
 *                       example: "R001"
 *                     startingPoint:
 *                       type: string
 *                       example: "Central Station"
 *                     endingPoint:
 *                       type: string
 *                       example: "East Terminal"
 *                     distance:
 *                       type: string
 *                       example: "150km"
 *                     isActive:
 *                       type: boolean
 *                       example: true
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
 *       403:
 *         description: User does not have the required admin role.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only admins can add routes."
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unable to save the route. Please try again later."
 */
router.post('/routes', authMiddleware, adminMiddleware, addRoute);

/**
 * @swagger
 * /api/admin/buses:
 *   post:
 *     summary: Add details of a new bus to the system
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busNumber
 *               - driverName
 *               - conductorName
 *               - operatorname
 *               - bustype
 *               - capacity
 *               - price
 *               - availableSeats
 *               - registrationNumber
 *               - routeNumber
 *             properties:
 *               busNumber:
 *                 type: string
 *                 description: Unique identifier for the bus (e.g., BUS001).
 *               driverName:
 *                 type: string
 *                 description: Full name of the driver.
 *               conductorName:
 *                 type: string
 *                 description: Full name of the conductor.
 *               operatorname:
 *                 type: string
 *                 description: Company managing the bus.
 *               bustype:
 *                 type: string
 *                 enum: [Luxury, Semi Luxury, Ordinary]
 *                 description: The classification of the bus service.
 *               capacity:
 *                 type: integer
 *                 description: Total seating capacity of the bus.
 *               price:
 *                 type: number
 *                 description: Ticket price for a single journey.
 *               availableSeats:
 *                 type: integer
 *                 description: Number of seats currently available for booking.
 *               registrationNumber:
 *                 type: string
 *                 description: Official registration plate of the bus.
 *               routeNumber:
 *                 type: string
 *                 description: Route associated with the bus.
 *     responses:
 *       201:
 *         description: The bus was successfully added to the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bus added successfully."
 *                 bus:
 *                   type: object
 *                   properties:
 *                     busNumber:
 *                       type: string
 *                       example: "BUS001"
 *                     registrationNumber:
 *                       type: string
 *                       example: "AB1234CD"
 *       400:
 *         description: Duplicate registration number or missing required fields.
 *       500:
 *         description: An internal server error occurred.
 */
router.post('/buses', authMiddleware, adminMiddleware, addBus);

/**
 * @swagger
 * /api/admin/routes:
 *   get:
 *     summary: Retrieve all transportation routes
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all active routes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   routeNumber:
 *                     type: string
 *                   startingPoint:
 *                     type: string
 *                   endingPoint:
 *                     type: string
 *                   distance:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 *       500:
 *         description: An error occurred while retrieving the routes.
 */
router.get('/routes', authMiddleware, adminMiddleware, getRoutes);

/**
 * @swagger
 * /api/admin/buses:
 *   get:
 *     summary: Get a list of all buses along with their assigned routes
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses with their corresponding route information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   busNumber:
 *                     type: string
 *                   routeDetails:
 *                     type: object
 *                     properties:
 *                       routeNumber:
 *                         type: string
 *                       startingPoint:
 *                         type: string
 *                       endingPoint:
 *                         type: string
 *       500:
 *         description: Unable to fetch buses.
 */
router.get('/buses', authMiddleware, adminMiddleware, getBuses);

module.exports = router;
