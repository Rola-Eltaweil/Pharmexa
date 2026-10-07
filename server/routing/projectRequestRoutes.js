import express from "express";

import {
  createProjectRequest,
  getMyProjectRequests,
  getAllProjectRequests,
  getApprovedProjectRequests,
  updateProjectRequestStatus,
} from "../controllers/ProjectRequestController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleAuth.js";

import upload from "../middleware/Upload.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  authorizeRoles("user"),
  upload.single("attachment"),
  createProjectRequest,
);

router.get(
  "/my-requests",
  authMiddleware,
  authorizeRoles("user"),
  getMyProjectRequests,
);

router.get("/", authMiddleware, authorizeRoles("admin"), getAllProjectRequests);

router.put(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  updateProjectRequestStatus,
);
router.get(
  "/approved",
  authMiddleware,
  authorizeRoles("admin"),
  getApprovedProjectRequests,
);

export default router;
