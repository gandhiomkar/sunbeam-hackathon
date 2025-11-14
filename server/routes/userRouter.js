const express = require("express");
const bcrypt = require("bcrypt");

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserPassword,
  getUserProfile,
} = require("../controllers/userController");
const { registerUser, loginUser } = require("../controllers/authController");
const {
  getUserReviews,
  getSharedReviews,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/reviews", getUserReviews);

router.get("/shared-reviews", getSharedReviews);

router.get("/me", getUserProfile);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/", updateUser);

router.delete("/:id", deleteUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/changepassword", updateUserPassword);

module.exports = router;
