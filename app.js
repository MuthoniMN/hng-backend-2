const express = require('express')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const orgRouter = require('./routes/org')
const cors = require('cors')
const app = express()

require('dotenv').config({ path: './.env' })
const port = process.env.PORT

app.use(express.json())

// routers
app.use('/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/organisations', orgRouter)

module.exports = app