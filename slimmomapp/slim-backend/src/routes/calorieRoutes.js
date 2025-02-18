const express = require("express");
const router = express.Router();
const {
  saveCalorieInfo,
  getCalorieInfo,
} = require("../controllers/calorieController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Calorie Info
 *   description: API for managing calorie information
 */

/**
 * @swagger
 * /api/calorieInfo/save-calorie-info:
 *   post:
 *     summary: Save calorie information for the logged-in user
 *     tags: [Calorie Info]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Calorie information to be saved
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *               age:
 *                 type: number
 *               currentWeight:
 *                 type: number
 *               desireWeight:
 *                 type: number
 *               bloodType:
 *                 type: number
 *               dailyRate:
 *                 type: number
 *               notRecommendedFoods:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Calorie info saved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/save-calorie-info", authMiddleware, saveCalorieInfo);

/**
 * @swagger
 * /api/calorieInfo/get-calorie-info:
 *   get:
 *     summary: Get calorie information for the logged-in user
 *     tags: [Calorie Info]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Calorie information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 height:
 *                   type: number
 *                 age:
 *                   type: number
 *                 currentWeight:
 *                   type: number
 *                 desireWeight:
 *                   type: number
 *                 bloodType:
 *                   type: number
 *                 dailyRate:
 *                   type: number
 *                 notRecommendedFoods:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Calorie info not found
 *       500:
 *         description: Internal server error
 */
router.get("/get-calorie-info", authMiddleware, getCalorieInfo);

module.exports = router;
