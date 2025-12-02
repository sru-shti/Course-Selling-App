// middleware/user.js 

const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config.js");

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied: Missing or invalid token format" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.id; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
}

module.exports = { userMiddleware };