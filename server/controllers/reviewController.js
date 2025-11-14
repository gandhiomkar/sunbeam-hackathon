const { error } = require("console");
const { pool } = require("../db/connection");
const { Status, createResponse } = require("../utils/createResponse");

const getUserReviews = async (req, res) => {
  const user_id = req.user.uid;
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id
    where user_id = ?`;
  try {
    const [data] = await pool.query(query, [user_id]);
    if (data != "") res.send(createResponse(Status.SUCCESS, data));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error);
  }
};

const getSharedReviews = async (req, res) => {
  const user_id = req.user.uid;
  const query = `select rid, movies.movie_id, rating, review,  reviews.user_id, modified, title, release_date, firstname, lastname, email
    from reviews 
    inner join movies on reviews.movie_id=movies.movie_id
    inner join users on users.uid = reviews.user_id
    inner join shares on shares.review_id = reviews.rid
    where shares.user_id = ?`;
  try {
    const data = await pool.query(query, [user_id]);
    if (data != "") res.send(createResponse(Status.SUCCESS, data[0]));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {}
};

module.exports = { getUserReviews, getSharedReviews };
