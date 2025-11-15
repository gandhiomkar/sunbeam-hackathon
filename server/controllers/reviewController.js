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
    return res.send(createResponse(Status.SUCCESS, data));
  } catch (error) {
    res.send(createResponse(Status.FAILED, error));
    console.log(error);
  }
};

const getReviewsByUserId = async (req, res) => {
  const user_id = req.params.uid;
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id
    where user_id = ?`;
  try {
    const [data] = await pool.query(query, [user_id]);
    if (data != "") return res.send(createResponse(Status.SUCCESS, data));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error);
  }
};

const getAllReviews = async (req, res) => {
  res.setHeader("content-type", "application/json");
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date, firstname, lastname, email
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id`;
  try {
    const result = await pool.query(query);
    if (result != "")
      return res.send(createResponse(Status.SUCCESS, result[0]));
    else res.send(createResponse(Status.FAILED, result));
  } catch (error) {
    console.log(error);
  }
};

const getReviewById = async (req, res) => {
  const reviewId = req.params.id;
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date, firstname, lastname, email
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id
     where rid = ?`;
  try {
    const data = await pool.query(query, [reviewId]);
    if (data != "") return res.send(createResponse(Status.SUCCESS, data[0]));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error);
  }
};

const getMovieReviews = async (req, res) => {
  const reviewId = req.params.id;
  const query = `select rid, movies.movie_id, rating, review, user_id, modified, title, release_date, firstname, lastname, email
    from reviews inner join movies on reviews.movie_id=movies.movie_id
    join users on users.uid = reviews.user_id
     where reviews.movie_id = ?`;
  try {
    const data = await pool.query(query, [reviewId]);
    if (data != "") return res.send(createResponse(Status.SUCCESS, data[0]));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  const { movie_id, rating, review } = req.body;
  const user_id = req.user.uid;

  const query = `insert into reviews(movie_id, rating, user_id, review) values(?,?,?,?);`;
  try {
    const data = await pool.query(query, [movie_id, rating, user_id, review]);
    if (data) {
      return res.send(createResponse(Status.SUCCESS, data));
    } else {
      res.send(createResponse(Status.FAILED, err));
    }
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const user_id = req.user.uid;
  const { rating, review } = req.body;
  console.log(reviewId, user_id, rating, review);

  const query = `update reviews set rating=?, review=?, modified=CURRENT_TIMESTAMP() where rid=? and user_id=?;`;
  try {
    const data = await pool.query(query, [rating, review, reviewId, user_id]);
    if (data) {
      return res.send(createResponse(Status.SUCCESS, data[0]));
    } else {
      res.send(createResponse(Status.FAILED, err));
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const user_id = req.user.uid;
  const { rating, review } = req.body;
  console.log(reviewId, user_id, rating, review);

  const query = `delete from reviews where rid=? ;`;
  try {
    const data = await pool.query(query, [rating, review, reviewId, user_id]);
    if (data) {
      return res.send(createResponse(Status.SUCCESS, data[0]));
    } else {
      res.send(createResponse(Status.FAILED, err));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserReviews,
  getReviewsByUserId,
  getAllReviews,
  getReviewById,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
};
