import express from "express";
import {
  AddProduct,
  getProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
} from "../controllers/Prodcuts.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/addProduct", adminAuth, AddProduct);
router.get("/products", adminAuth, getProducts);
router.get("/oneProduct/:id", adminAuth, getOneProduct);
router.put("/editProduct/:id", adminAuth, editProduct);
router.delete("/deleteProduct/:id", adminAuth, deleteProduct);
export default router;
