const express = require('express');
const { userReg, userLogin } = require('../controllers/auth');
const authRouter = express.Router();

authRouter.post('/register', userReg)

authRouter.post('/login', userLogin)

module.exports = authRouter;