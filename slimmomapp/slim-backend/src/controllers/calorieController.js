const User = require("../models/User");

/**
 * Save calorie information for the logged-in user
 * @swagger
 * /api/calorieInfo/save-calorie-info:
 *   post:
 *     summary: Save calorie information for the user
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
const saveCalorieInfo = async (req, res) => {
  const {
    height,
    age,
    currentWeight,
    desireWeight,
    bloodType,
    dailyRate,
    notRecommendedFoods,
  } = req.body;

  try {
    console.log(req.user);
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user._id);

    user.calorieInfo = {
      height,
      age,
      currentWeight,
      desireWeight,
      bloodType,
      dailyRate,
      notRecommendedFoods,
    };

    await user.save();
    res.status(200).json({ message: "Calorie info saved successfully" });
  } catch (error) {
    console.error("Error saving calorie info", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get calorie information for the logged-in user
 * @swagger
 * /api/calorieInfo/get-calorie-info:
 *   get:
 *     summary: Get calorie information for the user
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
const getCalorieInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.calorieInfo) {
      return res.status(404).json({ message: "Calorie info not found" });
    }
    res.status(200).json(user.calorieInfo);
  } catch (error) {
    console.error("Error fetching calorie info", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveCalorieInfo,
  getCalorieInfo,
};
