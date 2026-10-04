import express from "express";

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  searchContacts,
  deleteContactFile,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleAuth.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

router.get("/search", searchContacts);

router.post(
  "/contact",
  authMiddleware,
  authorizeRoles("user"),
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.log("UPLOAD ERROR:", err.message);

        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },
  createContact,
);

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
router.delete(
  "/deleteContactFile/:id",
  authMiddleware,
  authorizeRoles("service"),
  deleteContactFile,
);

export default router;
