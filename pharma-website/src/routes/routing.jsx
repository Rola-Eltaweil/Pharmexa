import React from "react";
import Product from "../Component/Product";
import App from "../App";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProduct";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import Login from "../pages/userAuth/login";
import Register from "../pages/userAuth/register";

import { createBrowserRouter } from "react-router-dom";
import { AdminProtected } from "../pages/Admin/AdminProtect";
import CustomerDashboard from "../pages/customer/customerDashboard";
import AdminService from "../pages/Admin/AdminService";
import CustomerService from "../pages/CustomeSupport/CustomerService";
import { CustomerServiceProtected } from "../pages/CustomeSupport/CustomerServiceProtected";
import RequestUser from "../pages/RequestUser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "product",
        element: <Product />,
      },
      {
        path: "my-requests",
        element: <RequestUser />,
      },
      {
        path: "customer_Dahboard",
        element: <CustomerDashboard />,
      },

      // Admin routes
      {
        element: <AdminProtected />,
        children: [
          {
            path: "dashboard",
            element: <HomeAdmin />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "products",
                element: <AdminProducts />,
              },
              {
                path: "service",
                element: <AdminService />,
              },
            ],
          },
        ],
      },
      {
        element: <CustomerServiceProtected />,
        children: [
          {
            element: <CustomerService />,
            path: "CustomerService",
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
