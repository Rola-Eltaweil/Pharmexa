import express from "express";
import {
  AddProduct,
  getProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
} from "../controllers/Prodcuts.js";
const router = express.Router();

router.post("/addProduct", AddProduct);
router.get("/products", getProducts);
router.get("/oneProduct/:id", getOneProduct);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct/:id", deleteProduct);
export default router;
