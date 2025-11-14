const os = require('os')
const path = require('path')
const express = require("express")
const url = require('url')
require('dotenv').config()
const cors = require('cors')

const {validateToken} = require('./utils/auth')
const userRouter = require('./routes/userRouter')
const reviewRouter = require('./routes/reviewRouter')
const movieRouter = require('./routes/movieRouter')
const corsProvider = require('./utils/corsUtil')
const logProvider = require('./utils/logUtil')

// dotenv.config()
app = express();
app.use(cors())
app.use(express.json())
app.use(validateToken)
app.use(logProvider)
app.use(corsProvider)
app.use('/users',userRouter)
app.use('/reviews', reviewRouter)
app.use('/movies', movieRouter)


app.listen(process.env.PORT || 4000,'0.0.0.0',()=>{
    console.log(`${new Date()} :: server is listening on port ${process.env.PORT}`)
})