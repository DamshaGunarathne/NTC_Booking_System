const express = require('express');
const router = express.Router();
const {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedulesByOperator,
  updateSeats,
  getSeatAvailability,
} = require('../controllers/OperatorController');
const authMiddleware = require('../middleware/authMiddleware');
const operatorMiddleware = require('../middleware/operatorMiddleware');

/**
 * @swagger
 * /api/operator/schedules/:
 *   post:
 *     summary: Add a new bus schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route:
 *                 type: object
 *                 properties:
 *                   routeNumber:
 *                     type: string
 *                     example: "R123"
 *                   routeName:
 *                     type: string
 *                     example: "Downtown to Uptown"
 *               bus:
 *                 type: object
 *                 properties:
 *                   registrationNumber:
 *                     type: string
 *                     example: "ABC1234"
 *                   operatorName:
 *                     type: string
 *                     example: "Cityline Express"
 *                   busType:
 *                     type: string
 *                     example: "Luxury"
 *                   ticketPrice:
 *                     type: number
 *                     example: 150.75
 *                   capacity:
 *                     type: number
 *                     example: 50
 *                   availableSeats:
 *                     type: number
 *                     example: 40
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     departurePoint:
 *                       type: string
 *                       example: "Downtown Terminal"
 *                     departureTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-01T08:00:00Z"
 *                     arrivalPoint:
 *                       type: string
 *                       example: "Uptown Terminal"
 *                     arrivalTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-01T10:00:00Z"
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Midway Stop"
 *               scheduleValid:
 *                 type: object
 *                 properties:
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-01"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-15"
 *               scheduleToken:
 *                 type: string
 *                 unique: true
 *                 example: "R123ABC123420250101-DowntownToUptown"
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 example: true
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule created successfully"
 *                 schedule:
 *                   type: object
 *                   $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Missing or invalid fields in the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *                 error:
 *                   type: string
 *                   example: "Bus capacity cannot be less than 0"
 */
router.post('/schedules', authMiddleware, operatorMiddleware, addSchedule);

/**
 * @swagger
 * /api/operator/schedules/{scheduleToken}:
 *   put:
 *     summary: Update an existing schedule by its token
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique token of the schedule to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     departurePoint:
 *                       type: string
 *                       example: "Downtown Terminal"
 *                     departureTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-02T08:00:00Z"
 *                     arrivalPoint:
 *                       type: string
 *                       example: "Uptown Terminal"
 *                     arrivalTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-02T10:00:00Z"
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Midway Stop"
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule updated successfully"
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Schedule not found
 */
router.put('/schedules/:scheduleToken', authMiddleware, operatorMiddleware, updateSchedule);

/**
 * @swagger
 * /api/operator/schedules/{scheduleToken}:
 *   delete:
 *     summary: Remove a schedule by its token
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The token identifying the schedule to be deleted
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 */
router.delete('/schedules/:scheduleToken', authMiddleware, operatorMiddleware, deleteSchedule);

// Additional routes...
router.get('/schedules', authMiddleware, operatorMiddleware, getSchedulesByOperator);
router.post('/schedules/:scheduleId/update-seats', authMiddleware, operatorMiddleware, updateSeats);
router.get('/schedules/:scheduleId/seats', authMiddleware, operatorMiddleware, getSeatAvailability);

module.exports = router;
