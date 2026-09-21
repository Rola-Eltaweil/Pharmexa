import express from "express";

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/Service.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public
router.get("/", getServices);
router.get("/:id", getServiceById);

// Admin only
router.post("/", adminAuth, createService);
router.put("/:id", adminAuth, updateService);
router.delete("/:id", adminAuth, deleteService);

export default router;
