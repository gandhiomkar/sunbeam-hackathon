const express = require("express");
const {
  getAllReviews,
  getReviewById,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { auth } = require("../middleware/auth");
const { getSharesOfReview, postReviewShare } = require("../controllers/shareController");

const router = express.Router();

router.get("/", getAllReviews);

router.post("/", auth, createReview);

router.get("/movie/:id", getMovieReviews);

router.get("/:id", getReviewById);

router.put("/:id", auth, updateReview);

router.delete("/:id", auth, deleteReview);

router.get("/share/:reviewId", auth, getSharesOfReview);

router.post("/share", auth, postReviewShare);

module.exports = router;
