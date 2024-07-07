const express = require('express')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const orgRouter = require('./routes/org')
const cors = require('cors')
const verifyToken = require('./middleware/auth')
const app = express()

app.use(cors())

require('dotenv').config({ path: './.env' })
const port = process.env.PORT

app.use(express.json())

// middleware
app.use('/api/*', verifyToken)

// routers
app.use('/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/organisations', orgRouter)

app.listen(port, () => {
    console.log("App is running on port: " + port)
})

module.exports = app