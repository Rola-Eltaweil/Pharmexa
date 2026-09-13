import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../Component/Product";
import App from "../App";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProduct";
import HomeAdmin from "../pages/Admin/HomeAdmin";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Route>
      <Route path="/Dashboard" element={<HomeAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>
    </Routes>
  );
};

export default Routing;
