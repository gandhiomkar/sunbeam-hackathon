const {pool} = require("../db/connection");
const bcrypt = require("bcrypt");
const { Status, createResponse } = require("../utils/createResponse");
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, mobile, birth} = req.body;

  try {
    const userFetchQuery = `SELECT email FROM users WHERE email = ?`;
    const users = await pool.query(userFetchQuery, [email]);
    if (users[0]!='') {
      return res.send(createResponse(Status.FAILED, "user already exists!"));
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const insertQuery = `INSERT INTO users(firstname, lastname, email, password, mobile, birth) VALUES(?,?,?,?,?,?)`
    const result = await pool.query(insertQuery,[firstname, lastname, email,hashedPassword, mobile, birth])
    if(result!=''){
        res.send(createResponse(Status.SUCCESS, result))
    }
  } catch (error) {
    res.send(createResponse(Status.FAILED, error))
  }
};


const loginUser = async (req, res) => {
    const {email, password}  = req.body

    try {
        if(email=='' || password=='')
            res.send(createResponse(Status.FAILED, "username or password cannot be empty"))
        const userQuery = `SELECT uid, firstname, lastname, email, password FROM users WHERE email = ?`
        const users = await pool.query(userQuery, [email])

        if(users=='')
            return res.send(createResponse(Status.FAILED,"user does not exist"))
        
        const user = users[0][0]
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid)
            return res.send(createResponse(Status.FAILED,"password invalid"))
        const userData = {
            "uid": user.uid,
            "firstname": user.firstname,
            "lastname": user.lastname
        }
        const token = jwt.sign(userData, process.env.JWT_SECRET)
        const bearerToken = 'Bearer ' + token
        return res.send(createResponse(Status.SUCCESS, bearerToken))

    } catch (error) {
        console.log(error)
        res.send(createResponse(Status.FAILED,error))
    }
}


module.exports = {registerUser, loginUser}