const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.put("/", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/assigned-users/:projectId", taskController.getAssignedUsersByProject);


module.exports = router;
