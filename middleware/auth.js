const jwt = require('jsonwebtoken');
const { validateToken } = require('../utils/jwt')

function verifyToken(req, res, next) {
    const payload = req.header('Authorization');
    const [str, token] = payload.split(" ")

    if (!token) return res.status(401).json({ 
        status: "Bad Request",
        message: 'Access denied',
        code: 401
    });
    try {
        const decoded = validateToken(token)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ 
            status: "Bad Request",
            message: 'Invalid token',
            code: 401
        });
    }
 };

module.exports = verifyToken;