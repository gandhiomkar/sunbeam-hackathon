const express = require("express");
const { createResponse, Status } = require("../utils/createResponse");
const { join } = require("path");

const router = express.Router();

router.get("/", async (req, res) => {
  res.setHeader("content-type", "application/json");
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date, firstname, lastname, email
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id`;
  try {
    const result = await pool.query(query);
    if (result != "") res.send(createResponse(Status.SUCCESS, result[0]));
    else res.send(createResponse(Status.FAILED, result));
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const reviewId = req.params.id;
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date, firstname, lastname, email
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id
     where rid = ?`;
  try {
    const data = await pool.query(query, [reviewId]);
    if (data != "") res.send(createResponse(Status.SUCCESS, data[0]));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error);
  }
});

router.get("/movie/:id", async (req, res) => {
  const reviewId = req.params.id;
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date, firstname, lastname, email
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id
     where reviews.movie_id = ?`;
  try {
    const data = await pool.query(query, [reviewId]);
    if (data != "") res.send(createResponse(Status.SUCCESS, data[0]));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { movie_id, rating, review } = req.body;
  const user_id = req.user.uid;

  const query = `insert into reviews(movie_id, rating, user_id, review) values(?,?,?,?);`;
  try {
    const data = await pool.query(query, [movie_id, rating, user_id, review]);
    if (data) {
      res.send(createResponse(Status.SUCCESS, data));
    } else {
      res.send(createResponse(Status.FAILED, err));
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const reviewId = req.params.id;
  const user_id = req.user.uid;
  const { rating, review } = req.body;
  console.log(reviewId, user_id, rating, review);

  const query = `update reviews set rating=?, review=?, modified=CURRENT_TIMESTAMP() where rid=? and user_id=?;`;
  try {
    const data = await pool.query(query, [rating, review, reviewId, user_id]);
    if (data) {
      res.send(createResponse(Status.SUCCESS, data[0]));
    } else {
      res.send(createResponse(Status.FAILED, err));
    }
  } catch (error) {
    console.log(error);
  }
});

// router.post("/share", async (req, res) => {
//   const { reviewId, userIds } = req.body;

//   const data = userIds.map((item) => {
//     return [item, reviewId];
//   });
//   console.log(data);
//   const query = `insert into shares(review_id, user_id) values(?);`;
//   try {
//     const [result] = await pool.query(query, [data]);
//     console.log(`Successfully inserted ${result.affectedRows} rows.`);
//     return result;
//   } catch (err) {
//     console.error("Error during bulk insert:", err);
//     throw err;
//   }
// });

async function insertRecord(record) {
  const sql = "insert into shares(review_id, user_id) values(?,?)";
  // Ensure the record is a flat array for this approach
  const values = [record[0], record[1]];

  // Use pool.execute() with a single connection for transactional integrity if needed,
  // or pool.query() directly for simplicity across different pool connections.
  const [result] = await pool.query(sql, values);
  return result;
}

const insertMultipleRecords = async (req, res) => {
  const { reviewId, userIds } = req.body;
  const records = userIds.map((item) => {
    return [reviewId, item];
  });
  try {
    // Create an array of Promises, one for each insert operation
    const promises = records.map((record) => insertRecord(record));

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    console.log(`All records inserted. Total operations: ${results.length}`);
    return res.send(createResponse(Status.SUCCESS, results));
  } catch (error) {
    console.error("An error occurred during an insertion:", error);
    return res.send(createResponse(Status.FAILED, results));
    // Promise.all rejects immediately if any promise rejects
    throw error;
  }
};
router.post("/share", insertMultipleRecords);

module.exports = router;

//TODO review update
// user profile update
// share review controller
// change password
