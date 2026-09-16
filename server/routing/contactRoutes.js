import express from "express";
import { createContact } from "../controllers/contactController.js";
import userAuth from "../middleware/userAuth.js";
const router = express.Router();

router.post("/contact", userAuth, createContact);

export default router;
