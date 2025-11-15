const express = require("express");
const { getAllMovies } = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;