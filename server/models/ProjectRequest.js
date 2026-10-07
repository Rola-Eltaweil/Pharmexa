import mongoose from "mongoose";

const projectRequestSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: Date,
    },

    attachment: {
      fileName: {
        type: String,
      },

      filePath: {
        type: String,
      },

      fileType: {
        type: String,
      },

      fileSize: {
        type: Number,
      },
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Project created from this request
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const projectRequest = mongoose.model("projectRequest", projectRequestSchema);

export default projectRequest;
