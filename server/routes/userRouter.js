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

router.get(
  "/",
  /*
#swagger.tags = ['User']
#swagger.summary = 'Get all users'
*/ getAllUsers
);

router.get(
  "/me",
  auth,
  /*
#swagger.tags = ['User']
#swagger.summary = 'Get User profile'
*/ getUserProfile
);

router.put(
  "/me",
  auth,
  /*
#swagger.tags = ['User']
#swagger.summary = 'Update User profile'
*/ updateUserProfile
);

router.post(
  "/me/changepassword",
  auth,
  /*
#swagger.tags = ['User']
#swagger.summary = 'Change User Password'
*/ updateUserPassword
);

router.get(
  "/me/reviews",
  auth,
  /*
#swagger.tags = ['User']
#swagger.summary = 'Get My reviews'
*/ getUserReviews
);

router.get(
  "/:id",
  /*
#swagger.tags = ['User']
#swagger.summary = 'Get a User'
*/ getUserById
);

router.delete(
  "/:id",
  auth,
  /*
#swagger.tags = ['User']
#swagger.summary = 'Delete User'
*/ deleteUser
);

router.get(
  "/:uid/reviews",
  /*
#swagger.tags = ['User']
#swagger.summary = 'Get User Reviews'
*/ getReviewsByUserId
);

router.get(
  "/me/shared-reviews",
  auth,
  /*
#swagger.tags = ['User']
#swagger.summary = 'Get reviews shared with me'
*/ getReviewsSharedToMe
);

module.exports = router;
