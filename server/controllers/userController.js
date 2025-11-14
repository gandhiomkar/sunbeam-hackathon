const { error } = require("console");
const { pool } = require("../db/connection");
const { Status, createResponse } = require("../utils/createResponse");

const getUsers = async (req, res) => {
  res.setHeader("content-type", "application/json");
  try {
    const query = `SELECT uid, firstname, lastname, email, mobile, birth FROM users;`;
    const users = await pool.query(query, [1]);
    return res.send(createResponse(Status.SUCCESS, users[0]));
  } catch (error) {
      res.send(createResponse(Status.FAILED, error));
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const query = `SELECT uid, firstname, lastname, email, mobile, birth FROM users WHERE uid = ?`;
  try {
    const data = await pool.query(query, [userId]);
    const users = data[0]
    if (users!='') {
        const user = users[0]
        if (user != "") res.send(createResponse(Status.SUCCESS, user));
    }
    else res.send(createResponse(Status.SUCCESS, "user not found!"));
  } catch (error) {
    res.send(createResponse(Status.FAILED, error));
  }
};

const updateUser = async (req, res) => {
  res.setHeader("content-type", "application/json");

  const userId = req.user.uid;
  const { firstname, lastname, email, mobile, birth } = req.body;

  const query = `update users set firstname = ?, lastname = ?, email = ?, mobile = ?, birth = ? where uid = ? `;
  try {
    const data = await  pool.query(query, [firstname, lastname, email, mobile, birth, userId]);
    if (data != "") res.send(createResponse(Status.SUCCESS, data[0]));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error)
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.uid;
  const query = `delete FROM users WHERE uid = ?`;
  try {
    const data = await pool.query(query, [userId]);
    if (data != "") res.send(createResponse(Status.SUCCESS, data));
    else res.send(createResponse(Status.FAILED, data));
  } catch (error) {
    console.log(error)
  }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
