const User = require("../models/UserModal");
const { errorResponse } = require("../utils/responseFormatter");

const deleteLevelPermission = async (req, res, next) => {
  const currentLevel = req.user.LevelId;
  const targetUserId = parseInt(req.params.userId);

  if (!targetUserId || isNaN(targetUserId)) {
    return res.json(errorResponse("Invalid user ID", 400));
  }

  const targetUser = await User.getUserById(targetUserId);
  if (!targetUser) {
    return res.json(errorResponse("Target user not found", 404));
  }

  const targetLevel = targetUser.LevelId;

  const isAllowed =
    (currentLevel === 3 && [1, 2, 3].includes(targetLevel)) ||
    (currentLevel === 2 && targetLevel === 1);

  if (!isAllowed) {
    return res.json(errorResponse("You do not have permission to delete this user", 403));
  }

  next();
};

module.exports = deleteLevelPermission;
