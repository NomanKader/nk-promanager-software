const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authenticateToken = require("../middleware/authMiddleware");
const allowLevels = require("../middleware/roleMIddleware");

router.use(authenticateToken);

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", allowLevels(2,3), projectController.createProject);
router.put("/", projectController.updateProject);
router.delete("/:id", allowLevels(2,3), projectController.deleteProject);

module.exports = router;
