import express from "express";

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  searchContacts,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/rolaAuth.js";

const router = express.Router();

router.get("/search", searchContacts);

router.post("/contact", authMiddleware, authorizeRoles("user"), createContact);

router.get(
  "/contacts",
  authMiddleware,
  authorizeRoles("service"),
  getAllContacts,
);

router.get(
  "/contact/:id",
  authMiddleware,
  authorizeRoles("service"),
  getContactById,
);

router.put(
  "/contact/:id/status",
  authMiddleware,
  authorizeRoles("service"),
  updateContactStatus,
);

router.delete(
  "/contact/:id",
  authMiddleware,
  authorizeRoles("service"),
  deleteContact,
);

export default router;
