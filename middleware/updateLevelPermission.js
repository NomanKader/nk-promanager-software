const { errorResponse } = require("../utils/responseFormatter");

const updateLevelPermission = async (req, res, next) => {
  try {
    const currentLevel = req.user.LevelId;

    if (currentLevel !== 3) {
      return res.status(403).json(
        errorResponse("Only level 3 users are allowed to update user data", 403)
      );
    }

    next(); 
  } catch (err) {
    console.error("Level permission check failed:", err);
    return res.status(500).json(
      errorResponse("Internal server error during permission check", 500)
    );
  }
};

module.exports = updateLevelPermission;
