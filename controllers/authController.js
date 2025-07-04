const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/authModal");
const { successResponse, errorResponse } = require("../utils/responseFormatter");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.json(errorResponse("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.json(errorResponse("Invalid email or password", 401));
    }

    // ✅ Embed user info inside JWT payload
    const tokenPayload = {
      userId: user.UserId,
      userName: user.UserName,
      email: user.Email,
      level: user.LevelId
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });

    res.json(
      successResponse(
        {
          token
        },
        "Login successful",
        200
      )
    );
  } catch (error) {
    console.error("Login error:", error);
    res.json(errorResponse("Login failed", 500));
  }
};
