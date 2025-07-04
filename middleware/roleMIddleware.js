const { errorResponse } = require("../utils/responseFormatter");

const allowLevels = (...allowedLevels) => {
  return (req, res, next) => {
    const userLevel = req.user?.LevelId;
    if (!allowedLevels.includes(userLevel)) {
      return res.json(errorResponse("Access denied", 403));
    }
    next();
  };
};

module.exports = allowLevels;
