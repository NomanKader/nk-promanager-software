const express = require("express");
const router = express.Router();
const {
  getAllLevels,
  createLevel,
} = require("../controllers/levelController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/",authenticateToken, getAllLevels);


module.exports = router;
