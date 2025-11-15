const { pool } = require("../db/connection");
const { Status, createResponse } = require("../utils/createResponse");

const getSharesOfReview = (req, res) => {
  //TODO review shares
};

async function insertRecord(record) {
  const sql = "insert into shares(review_id, user_id) values(?,?)";
  const values = [record[0], record[1]];

  const [result] = await pool.query(sql, values);
  return result;
}

const postReviewShare = async (req, res) => {
  const { reviewId, userIds } = req.body;
  const records = userIds.map((item) => {
    return [reviewId, item];
  });
  try {
    const promises = records.map((record) => insertRecord(record));

    const results = await Promise.all(promises);
    console.log(`All records inserted. Total operations: ${results.length}`);
    return res.send(createResponse(Status.SUCCESS, results));
  } catch (error) {
    console.error("An error occurred during an insertion:", error);
    return res.send(createResponse(Status.FAILED, results));
    throw error;
  }
};

const getReviewsSharedToMe = async (req, res) => {
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

module.exports = { postReviewShare, getSharesOfReview, getReviewsSharedToMe};
