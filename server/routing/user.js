import express from "express";

import {
  AddProduct,
  getProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
} from "../controllers/Prodcuts.js";

import authorizeRoles from "../middleware/rolaAuth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addProduct", authMiddleware, authorizeRoles("admin"), AddProduct);

router.get("/products", authMiddleware, authorizeRoles("admin"), getProducts);

router.get(
  "/oneProduct/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getOneProduct,
);

router.put(
  "/editProduct/:id",
  authMiddleware,
  authorizeRoles("admin"),
  editProduct,
);

router.delete(
  "/deleteProduct/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteProduct,
);

export default router;
