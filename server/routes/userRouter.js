const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
  updateUserPassword,
  getUserProfile,
} = require("../controllers/userController");
const {
  getUserReviews,
  getReviewsByUserId,
} = require("../controllers/reviewController");
const { auth } = require("../middleware/auth");
const { getReviewsSharedToMe } = require("../controllers/shareController");

const router = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getAllUsers);

router.get("/me", auth, getUserProfile);

router.put("/me", auth, updateUserProfile);

router.post("/me/changepassword", auth, updateUserPassword);

router.get("/me/reviews", auth, getUserReviews);

router.get("/:id", getUserById);

router.delete("/:id", auth, deleteUser);

router.get("/:uid/reviews", getReviewsByUserId);

router.get("/me/shared-reviews", auth, getReviewsSharedToMe);

module.exports = router;
