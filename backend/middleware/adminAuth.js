// middleware/adminAuth.js

const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config.js");

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied: Missing or invalid token format" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.adminId = decoded.id; // Correct variable name for admin
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
}

module.exports = { authenticateAdmin };