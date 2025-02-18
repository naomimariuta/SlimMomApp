const express = require("express");
const {
  validateAuth,
  authorizeRoles,
} = require("../middleware/validationMiddleware");
const {
  getAllProducts,
  createProduct,
  getDailyIntake,
  saveDailyIntake,
  searchProducts,
  addConsumedProduct,
  deleteConsumedProduct,
  getDayInfo,
} = require("../controllers/productController");

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */
router.post("/", validateAuth, authorizeRoles("admin"), createProduct);

/**
 * @swagger
 * /api/products/daily-intake:
 *   get:
 *     summary: Get daily intake and not recommended products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: weight
 *         schema:
 *           type: number
 *         required: true
 *         description: The weight of the user
 *       - in: query
 *         name: height
 *         schema:
 *           type: number
 *         required: true
 *         description: The height of the user
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *         required: true
 *         description: The age of the user
 *       - in: query
 *         name: bloodType
 *         schema:
 *           type: string
 *         required: true
 *         description: The blood type of the user
 *     responses:
 *       200:
 *         description: The daily intake and not recommended products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyKcal:
 *                   type: number
 *                 notRecommendedProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 */
router.get("/daily-intake", getDailyIntake);

/**
 * @swagger
 * /api/products/daily-intake:
 *   post:
 *     summary: Save daily intake info for authenticated user
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               age:
 *                 type: number
 *               bloodType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Daily intake info saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyKcal:
 *                   type: number
 *                 notRecommendedProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 */
router.post("/daily-intake", validateAuth, saveDailyIntake);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query
 *       - in: query
 *         name: bloodType
 *         schema:
 *           type: string
 *         required: true
 *         description: The blood type of the user
 *     responses:
 *       200:
 *         description: The list of products matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Query string is required
 *       500:
 *         description: Internal server error
 */
router.get("/search", searchProducts);

/**
 * @swagger
 * /api/products/consumed:
 *   post:
 *     summary: Add consumed product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Consumed product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsumedProduct'
 *       500:
 *         description: Internal server error
 */
router.post("/consumed", validateAuth, addConsumedProduct);

/**
 * @swagger
 * /api/products/consumed/{id}:
 *   delete:
 *     summary: Delete consumed product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the consumed product to delete
 *     responses:
 *       200:
 *         description: Consumed product deleted successfully
 *       404:
 *         description: Consumed product not found
 */
router.delete("/consumed/:id", validateAuth, deleteConsumedProduct);

/**
 * @swagger
 * /api/products/day-info:
 *   get:
 *     summary: Get day info
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date to get info for
 *     responses:
 *       200:
 *         description: Day info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 totalCalories:
 *                   type: number
 *                 consumedProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ConsumedProduct'
 *       400:
 *         description: Date is required
 *       404:
 *         description: No consumed products found
 */
router.get("/day-info", validateAuth, getDayInfo);

module.exports = router;
