import project from "../models/Project.js";
import projectRequest from "../models/ProjectRequest.js";

// ---------------- CREATE PROJECT ----------------

const createProject = async (req, res) => {
  try {
    const { projectRequestId, status, progress, assignedMembers } = req.body;

    // Check request
    const request = await projectRequest.findById(projectRequestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Project request not found",
      });
    }

    // Only approved requests can become projects
    if (request.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message:
          "Only approved project requests can be converted into projects",
      });
    }

    // Prevent creating the same project twice
    if (request.projectId) {
      return res.status(400).json({
        success: false,
        message:
          "This project request has already been converted into a project",
      });
    }

    // Create project using request data
    const newProject = await project.create({
      name: request.projectName,
      description: request.description,
      status: status || "Not Started",
      progress: Number(progress) || 0,
      clientId: request.clientId,
      assignedMembers: assignedMembers || [],
      projectRequestId: request._id,
    });

    // Link project to request
    await projectRequest.findByIdAndUpdate(request._id, {
      projectId: newProject._id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- GET PROJECTS ----------------

const getProjects = async (req, res) => {
  try {
    let projects;

    if (req.role === "admin") {
      projects = await project
        .find()
        .populate("clientId", "name email")
        .populate("assignedMembers", "name email");
    } else if (req.role === "teamMember") {
      projects = await project
        .find({
          assignedMembers: req._id,
        })
        .populate("clientId", "name email")
        .populate("assignedMembers", "name email");
    } else if (req.role === "user") {
      projects = await project
        .find({
          clientId: req._id,
        })
        .populate("clientId", "name email")
        .populate("assignedMembers", "name email");
    } else {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view projects",
      });
    }

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- UPDATE PROJECT ----------------

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProject = await project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- DELETE PROJECT ----------------

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- PROJECT STATS ----------------

const getProjectStats = async (req, res) => {
  try {
    let filter = {};

    if (req.role === "teamMember") {
      filter = {
        assignedMembers: req._id,
      };
    } else if (req.role === "user") {
      filter = {
        clientId: req._id,
      };
    } else if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view project statistics",
      });
    }

    const totalProjects = await project.countDocuments(filter);

    const inProgress = await project.countDocuments({
      ...filter,
      status: "In Progress",
    });

    const completed = await project.countDocuments({
      ...filter,
      status: "Completed",
    });

    const notStarted = await project.countDocuments({
      ...filter,
      status: "Not Started",
    });

    const onHold = await project.countDocuments({
      ...filter,
      status: "On Hold",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        inProgress,
        completed,
        notStarted,
        onHold,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectStats,
};
