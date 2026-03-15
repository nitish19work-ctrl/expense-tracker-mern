const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    console.log("Authorization header:", req.headers.authorization);
    console.log("Extracted token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        console.log("JWT VERIFY ERROR:", err.message);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};