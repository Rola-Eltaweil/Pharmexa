import projectRequest from "../models/ProjectRequest.js";

// USER - Create Project Request
const createProjectRequest = async (req, res) => {
  try {
    const { projectName, description, service, deadline } = req.body;

    const newRequest = await projectRequest.create({
      projectName,
      description,
      service,
      deadline,
      clientId: req._id,

      attachment: req.file
        ? {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
          }
        : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Project request submitted successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// USER - Get My Project Requests
const getMyProjectRequests = async (req, res) => {
  try {
    const requests = await projectRequest
      .find({ clientId: req._id })
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN - Get All Project Requests
const getAllProjectRequests = async (req, res) => {
  try {
    const requests = await projectRequest
      .find()
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN - Get Approved Requests
// Only requests that have not been converted into projects
const getApprovedProjectRequests = async (req, res) => {
  try {
    const requests = await projectRequest
      .find({
        status: "Approved",
        projectId: null,
      })
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN - Update Project Request Status
const updateProjectRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request status",
      });
    }

    const updatedRequest = await projectRequest.findByIdAndUpdate(
      id,
      {
        status,

        // Remove project connection if status
        // changes from Approved to another status
        ...(status !== "Approved" && {
          projectId: null,
        }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Project request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project request status updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createProjectRequest,
  getMyProjectRequests,
  getAllProjectRequests,
  getApprovedProjectRequests,
  updateProjectRequestStatus,
};
