const express = require('express');
const {protect, authorize} = require('../middleware/auth');
const {register, login, getMe} = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error or Email already in use
 */
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current logged in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *       401:
 *         description: Not authorized, token missing or invalid
 */
// PROTECTED ROUTE: Only logged-in users with a token can access this
router.get('/me', protect, getMe);

// AUTHORIZED ROUTE: Only logged-in users with the 'admin' role can access this
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the Z-MANSA Admin Dashboard' });
});

module.exports = router;