const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenicateToken = require("../middleware/authMiddleware");
const createLevelPermission = require("../middleware/createLevelPermission");
const updateLevelPermission = require("../middleware/updateLevelPermission");
const deleteLevelPermission = require("../middleware/deleteLevelPermission");

router.post("/",authenicateToken,createLevelPermission, createUser);
router.get("/",authenicateToken, getAllUsers);
router.put("/", authenicateToken,updateLevelPermission, updateUser);
router.delete("/:userId",authenicateToken,deleteLevelPermission, deleteUser);

module.exports = router;
