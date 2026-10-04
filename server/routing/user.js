import express from "express";

import {
  register,
  login,
  userDetails,
  logout,
  updateUserProfile,
  changePassword,
  getProductsuser,
  searchProducts,
  getMyContacts,
} from "../controllers/User.js";

import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleAuth.js";
const router = express.Router();

// Authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

// User Profile
router.get("/userDetails", authMiddleware, userDetails);
router.put("/profile", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);

router.get("/products", getProductsuser);
router.get("/search", searchProducts);
router.get(
  "/myRequests",
  authMiddleware,
  authorizeRoles("user"),
  getMyContacts,
);
export default router;
