import express from "express";
import { login, logout, register, userDetails } from "../controllers/user.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/userDetails", userAuth, userDetails);
router.post("/logout", logout);

export default router;
