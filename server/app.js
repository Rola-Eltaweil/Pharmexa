import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import dataBaseConnection from "./config/db.js";
import contact from "./routing/contactRoutes.js";
import Product from "./routing/Product.js";
import userAuth from "./routing/user.js";
import cookieParser from "cookie-parser";
import Service from "./routing/Service.js";
import projectRoutes from "./routing/Project.js";
import projectRequestRoutes from "./routing/projectRequestRoutes.js";
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
app.use(cookieParser());
dataBaseConnection();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = 5000;
app.use("/api/customerService", contact);
app.use("/api/admin/dashboard", Product);
app.use("/api/admin/dashboard/service", Service);
app.use("/api/projects", projectRoutes);
app.use("/api/project-requests", projectRequestRoutes);
app.use("/api", userAuth);
app.listen(PORT, () => {
  console.log("server listening now!");
});
