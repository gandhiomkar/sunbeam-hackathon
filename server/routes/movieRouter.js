const express = require("express");
const { createResponse, Status } = require("../utils/createResponse");
const { join } = require("path");

const router = express.Router();

router.get("/", async (req, res) => {
  res.setHeader("content-type", "application/json");
  const query = `select movie_id, title, release_date, description, poster_url from movies`;
  try {
    const result = await pool.query(query);
    if (result != "") res.send(createResponse(Status.SUCCESS, result[0]));
    else res.send(createResponse(Status.FAILED, result));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;