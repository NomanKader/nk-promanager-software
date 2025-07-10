const taskModel = require('../models/taskModal');
const { successResponse, errorResponse, messageOnlyResponse } = require('../utils/responseFormatter');
const { v4: uuidv4 } = require("uuid");

exports.createTask = async (req, res) => {
  try {
    const {
      TaskName,
      ProjectId,
      TaskStartDate,
      TaskDueDate,
      TaskStatus,
      BusinessName,
      assignedUserIds,
    } = req.body;

    if (!TaskName || !ProjectId || !BusinessName || !Array.isArray(assignedUserIds) || assignedUserIds.length === 0) {
      return res.json(errorResponse("Missing required fields or assigned users", 400));
    }

    const TaskUserID = uuidv4();

    const taskData = {
      TaskName,
      ProjectId,
      TaskUserID,
      TaskStartDate,
      TaskDueDate,
      TaskStatus,
      BusinessName,
      CreatedBy: req.user?.UserId || 0,
    };

    // Validation
    const projectExists = await taskModel.checkProjectExists(ProjectId);
    if (!projectExists) return res.json(errorResponse("Project not found", 404));

    for (const userId of assignedUserIds) {
      const userExists = await taskModel.checkUserExists(userId);
      if (!userExists) return res.json(errorResponse(`User ${userId} not found`, 404));
    }

    await taskModel.createTask(taskData, assignedUserIds);
    res.json(messageOnlyResponse(200, "Task created successfully"));
  } catch (error) {
    console.error("Create task error:", error);
    res.json(errorResponse("Failed to create task", 500));
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(successResponse({ taskList: tasks }));
  } catch (error) {
    res.json(errorResponse("Failed to fetch tasks", 500));
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { TaskId } = req.body;
    if (!TaskId) return res.json(errorResponse("TaskId is required", 400));

    await taskModel.updateTask(TaskId, req.body);
    res.json(messageOnlyResponse(200, "Task updated successfully"));
  } catch (error) {
    res.json(errorResponse("Failed to update task", 500));
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.deleteTask(parseInt(id));
    res.json(messageOnlyResponse(200, "Task deleted successfully"));
  } catch (error) {
    res.json(errorResponse("Failed to delete task", 500));
  }
};

exports.getAssignedUsersByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("Fetching assigned users for project:", projectId);
    const data = await taskModel.getAssignedUsersByProject(projectId);
    res.json(successResponse({ assignedUsers: data }));
  } catch (error) {
    res.json(errorResponse("Failed to get assigned users", 500));
  }
};

