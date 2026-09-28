import express from "express";
import {
  login,
  logout,
  register,
  userDetails,
  updateUserProfile,
  changePassword,
  getProductsuser,
  searchProducts,
} from "../controllers/user.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/userDetails", userAuth, userDetails);
router.post("/logout", logout);
router.put("/profile", userAuth, updateUserProfile);
router.put("/change-password", userAuth, changePassword);
router.get("/products", userAuth, getProductsuser);
router.get("/search", searchProducts);

export default router;
