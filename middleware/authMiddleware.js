const jwt = require("jsonwebtoken");
const User = require("../models/UserModal"); 
const { errorResponse } = require("../utils/responseFormatter");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json(errorResponse("No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.getUserById(decoded.userId);
    if (!existingUser) {
      return res.json(errorResponse("User not found", 404));
    }

    req.user = existingUser; 
    next();
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return res.json(errorResponse("Invalid or expired token", 403));
  }
};

module.exports = authenticateToken;
