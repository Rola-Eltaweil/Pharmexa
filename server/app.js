import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import dataBaseConnection from "./config/db.js";
import contact from "./routing/contactRoutes.js";
import Product from "./routing/Product.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

dataBaseConnection();
const PORT = 5000;

app.use("/api/user", contact);
app.use("/api/admin/dashboard", Product);
app.listen(PORT, () => {
  console.log("server listening now!");
});
