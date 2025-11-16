const express = require("express");
const { getAllMovies } = require("../controllers/movieController");

const router = express.Router();

router.get(
  "/",
  /*
#swagger.tags = ['Movies']
#swagger.summary = 'Get all movies'
*/ getAllMovies
);

module.exports = router;
