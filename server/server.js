const os = require('os')
const path = require('path')
const express = require("express")
require('dotenv').config()
const cors = require('cors')

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const reviewRouter = require('./routes/reviewRouter')
const movieRouter = require('./routes/movieRouter')
const requestLogger = require('./middleware/requestLoggerMiddleware')

// dotenv.config()
app = express();
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/reviews', reviewRouter)
app.use('/movie', movieRouter)


app.listen(process.env.PORT || 4000,'0.0.0.0',()=>{
    console.log(`${new Date()} :: server is listening on port ${process.env.PORT}`)
})