const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    const token = jwt.sign({  userId: userId}, process.env.JWT_SECRET, { expiresIn: "1h" })        

    return token;
}

const validateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    validateToken
}