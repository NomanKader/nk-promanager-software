const { errorResponse } = require("../utils/responseFormatter");

const createLevelPermission = (req, res, next) => {
  const currentLevel = req.user.LevelId;
  const targetLevel = parseInt(req.body.level_id);

  if (!targetLevel || isNaN(targetLevel)) {
    return res.json(errorResponse("Target level is missing or invalid", 400));
  }

  const isAllowed =
    (currentLevel === 3 && [1, 2, 3].includes(targetLevel)) ||
    (currentLevel === 2 && targetLevel === 1);

  if (!isAllowed) {
    return res.json(errorResponse("You do not have permission to create this level", 403));
  }

  next();
};

module.exports = createLevelPermission;
