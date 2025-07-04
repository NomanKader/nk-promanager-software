const projectModel = require("../models/projectModal");
const { successResponse, errorResponse, messageOnlyResponse } = require("../utils/responseFormatter");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.json(successResponse({ projectList: projects }));
  } catch (error) {
    console.error("Get all projects error:", error);
    res.json(errorResponse("Failed to fetch projects", 500));
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    if (!projectId) return res.json(errorResponse("Invalid project ID", 400));

    const project = await projectModel.getProjectById(projectId);
    if (!project) return res.json(errorResponse("Project not found", 404));

    res.json(successResponse({ project }));
  } catch (error) {
    console.error("Get project by ID error:", error);
    res.json(errorResponse("Failed to fetch project", 500));
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await projectModel.createProject(req.body);
    res.json(successResponse( messageOnlyResponse(200,"Project created successfully")));
  } catch (error) {
    console.error("Create project error:", error);
    res.json(errorResponse("Failed to create project", 500));
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId || isNaN(projectId)) {
      return res.json(errorResponse("Invalid project ID", 400));
    }

    await projectModel.updateProject(projectId, req.body);

    res.json(messageOnlyResponse(200,"Project updated successfully"));
  } catch (error) {
    console.error("Update project error:", error);
    res.json(errorResponse("Failed to update project", 500));
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    if (!projectId) return res.json(errorResponse("Invalid project ID", 400));

    await projectModel.deleteProject(projectId);
    res.json(messageOnlyResponse(200,"Project deleted successfully"));
  } catch (error) {
    console.error("Delete project error:", error);
    res.json(errorResponse("Failed to delete project", 500));
  }
};
