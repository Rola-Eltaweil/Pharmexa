import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  getProjectStats,
  updateProject,
} from "../controllers/ProjectController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/create", authMiddleware, authorizeRoles("admin"), createProject);
router.get("/stats", authMiddleware, getProjectStats);

router.get("/", authMiddleware, getProjects);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "teamMember"),
  updateProject,
);

router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteProject);
export default router;
