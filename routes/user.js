const express = require('express');
const { getUser } = require('../controllers/user');
const verifyToken = require('../middleware/auth');
const userRouter = express.Router();

userRouter.all('*', verifyToken)

userRouter('/:userId', getUser)

module.exports = userRouter;