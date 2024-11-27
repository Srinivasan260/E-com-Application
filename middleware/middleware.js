const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    // console.log(token)
    
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        // Verify token and attach user data to request
        console.log(process.env.ACCESS_TOKEN);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
