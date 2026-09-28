import express from "express";

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  searchContacts,
} from "../controllers/contactController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();
router.get("/search", searchContacts);

router.post("/contact", userAuth, createContact);

router.get("/contacts", userAuth, getAllContacts);

router.get("/contact/:id", userAuth, getContactById);

router.put("/contact/:id/status", userAuth, updateContactStatus);

router.delete("/contact/:id", userAuth, deleteContact);

export default router;
