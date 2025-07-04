const levelModel = require('../models/LevelModal');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

exports.getAllLevels = async (req, res) => {
  try {
    const levels = await levelModel.getAllLevels();

    res.json(
      successResponse(
        { levelLists: Array.isArray(levels) ? levels : [] },
        "Levels fetched successfully",
        200
      )
    );
  } catch (error) {
    console.error("Level fetch error:", error);
    res.json(errorResponse("Failed to fetch levels", 500));
  }
};
