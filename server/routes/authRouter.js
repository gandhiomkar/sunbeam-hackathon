const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authController");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */

router.post("/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Login User
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Login Successful
 *          400:
 *              description: Login failed
 */
router.post("/login", loginUser);

module.exports = router;
