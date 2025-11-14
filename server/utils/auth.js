const { Status, createResponse } = require("../utils/createResponse");
const jwt = require('jsonwebtoken')
const config = require('../config.json')

const validateToken = (req, res, next) => {
    console.log(config.unprotectedPaths+':'+ req.url)
    if(config.unprotectedPaths.includes(req.url)){
        return next()
    }
    const bearerToken = req.headers.authorization
    if(!bearerToken || bearerToken == '')
        return res.send(createResponse(Status.FAILED,"token missing"))
    try {
        const token = bearerToken.split(' ')[1]
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data
        next()
    } catch (error) {
        return res.send(createResponse(Status.FAILED, error))
    }
}

module.exports = {validateToken}