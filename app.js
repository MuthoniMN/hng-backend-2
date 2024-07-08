const express = require('express')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const orgRouter = require('./routes/org')
const verifyToken = require('./middleware/auth')
const app = express()

require('dotenv').config({ path: './.env' })
const port = process.env.PORT

app.use(express.json())

app.use('/api/*', verifyToken)
// routers
app.use('/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/organisations', orgRouter)

module.exports = app