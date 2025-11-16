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

router.get("/",/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Get All reviews'
*/ getAllReviews);

router.post("/", auth,/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Create a reviews'
*/ createReview);

router.get("/movie/:id",
  /*
#swagger.tags = ['Reviews']
#swagger.summary = 'Get Movie reviews'
*/ getMovieReviews);

router.get("/:id",/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Get A review'
*/ getReviewById);

router.put("/:id", auth,/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Update A reviews'
*/ updateReview);

router.delete("/:id", auth,/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Delete A reviews'
*/ deleteReview);

router.get("/share/:reviewId", auth,/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Get All shares of a review'
*/ getSharesOfReview);

router.post("/share", auth,/*
#swagger.tags = ['Reviews']
#swagger.summary = 'Post A review share with other users'
#swagger.parameters['body'] = {
      in: 'body',
      description: 'Review share request payload',
      required: true,
      schema: {
        reviewId: '1',
        userIds: [1, 2, 3]
      }
    }
*/ postReviewShare);

module.exports = router;
