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
            ],
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
