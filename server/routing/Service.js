import express from "express";

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/Service.js";

import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleAuth.js";

const router = express.Router();

// Public
router.get("/", getServices);

router.get("/:id", getServiceById);

// Admin only
router.post("/", authMiddleware, authorizeRoles("admin"), createService);

router.put("/:id", authMiddleware, authorizeRoles("admin"), updateService);

router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteService);

export default router;
