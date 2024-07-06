const jwt = require('jsonwebtoken');
const { validateToken } = require('../utils/jwt')

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        validateToken(token)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

module.exports = verifyToken;