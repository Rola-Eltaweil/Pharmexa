import React from "react";
import Product from "../Component/Product";
import App from "../App";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProduct";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import Login from "../pages/userAuth/login";
import Register from "../pages/userAuth/register";
import ProjectRequest from "../pages/ProjectDashboard/ProjectRequest";
import { createBrowserRouter } from "react-router-dom";
import { AdminProtected } from "../pages/Admin/AdminProtect";
import CustomerDashboard from "../pages/customer/customerDashboard";
import AdminService from "../pages/Admin/AdminService";
import CustomerService from "../pages/CustomeSupport/CustomerService";
import { CustomerServiceProtected } from "../pages/CustomeSupport/CustomerServiceProtected";
import RequestUser from "../pages/RequestUser";
import Dashboard from "../pages/ProjectDashboard/Dashboard";
import ProjectRreuestStatus from "../pages/ProjectDashboard/ProjectRreuestStatus";
import TeamMemberDashboard from "../pages/ProjectDashboard/TeamMemberDashboard";
import { TeamMemberProtected } from "../pages/ProjectDashboard/ProjectMemberProtected";
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
        path: "project-requests",
        element: <ProjectRequest />,
      },
      {
        path: "customer_Dahboard",
        element: <CustomerDashboard />,
      },
      {
        element: <TeamMemberProtected />,
        children: [
          {
            path: "dashboard/team-member",
            element: <TeamMemberDashboard />,
          },
        ],
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
              {
                path: "projectRequest",
                element: <ProjectRreuestStatus />,
              },
              {
                path: "Projects",
                element: <Dashboard />,
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
