import {
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  FileText,
  Headset,
} from "lucide-react";

import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../utils/apiSummary";
import { Endpoint } from "../utils/routes";
import { clearUser } from "../redux/userSlice";

const Nav = () => {
  const [openNav, setopenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const user = useSelector((state) => state.user.userDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await postData(Endpoint.logout.url);

      if (response?.data?.success) {
        dispatch(clearUser());
        navigate("/login");
      }
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <div className="bg-nav">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-wide text-primary">
              PHARM
              <span className="font-light">EXA</span>
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <FaBarsStaggered
          onClick={() => setopenNav(true)}
          className="flex cursor-pointer items-end justify-center text-3xl text-primary md:hidden"
        />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="nav-item">
            About
          </a>

          <a href="#service" className="nav-item">
            Services
          </a>

          <Link to="/product">
            <p className="nav-item">Products</p>
          </Link>

          <a href="#manufacturing" className="nav-item">
            Manufacturing
          </a>

          {/* User */}
          {user ? (
            <div className="relative">
              {/* User Button */}
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <User size={19} />
                </div>

                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>

                  <p className="max-w-32 truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>

                <ChevronDown
                  size={17}
                  className={`text-gray-500 transition-transform ${
                    openDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {openDropdown && (
                <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                  {/* Menu Items */}
                  <div className="p-2">
                    {/* Dashboard */}
                    <Link
                      to="/customer_Dahboard"
                      onClick={() => setOpenDropdown(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-primary"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <LayoutDashboard size={18} />
                      </div>

                      <div>
                        <p className="font-medium">My Dashboard</p>

                        <p className="text-xs text-gray-400">
                          Manage your account
                        </p>
                      </div>
                    </Link>

                    {/* My Requests */}
                    {user?.role?.toLowerCase() === "user" && (
                      <Link
                        to="/my-requests"
                        onClick={() => setOpenDropdown(false)}
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-primary"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                          <FileText size={18} />
                        </div>

                        <div>
                          <p className="font-medium">My Requests</p>

                          <p className="text-xs text-gray-400">
                            View your requests & files
                          </p>
                        </div>
                      </Link>
                    )}

                    {/* Customer Service */}
                    {user?.role?.toLowerCase() === "service" && (
                      <Link
                        to="/CustomerService"
                        onClick={() => setOpenDropdown(false)}
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-primary"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                          <Headset size={18} />
                        </div>

                        <div>
                          <p className="font-medium">Customer Service</p>

                          <p className="text-xs text-gray-400">
                            Manage customer requests
                          </p>
                        </div>
                      </Link>
                    )}

                    {/* Divider */}
                    <div className="my-2 border-t border-gray-100" />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                        <LogOut size={18} />
                      </div>

                      <div className="text-left">
                        <p className="font-medium">Logout</p>

                        <p className="text-xs text-red-400">
                          Sign out of your account
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Get Started */
            <Link to="/login">
              <p className="rounded-full bg-linear-to-r from-primary to-blue-400 px-6 py-2 text-[18px] text-white">
                Get Started
              </p>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        {openNav && (
          <div className="absolute left-0 top-20 z-50 flex w-full flex-col items-center gap-8 bg-nav py-10 md:hidden">
            <a
              href="#about"
              onClick={() => setopenNav(false)}
              className="inline-block px-3 py-2 font-medium text-gray-700 transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              About
            </a>

            <a
              href="#service"
              onClick={() => setopenNav(false)}
              className="inline-block px-3 py-2 font-medium text-gray-700 transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              Services
            </a>

            <Link
              to="/product"
              onClick={() => setopenNav(false)}
              className="inline-block px-3 py-2 font-medium text-gray-700 transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              Products
            </Link>

            <a
              href="#manufacturing"
              onClick={() => setopenNav(false)}
              className="inline-block px-3 py-2 font-medium text-gray-700 transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              Manufacturing
            </a>

            {/* Mobile - User Links */}
            {user && (
              <>
                <Link
                  to="/customer_Dahboard"
                  onClick={() => setopenNav(false)}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <LayoutDashboard size={18} />
                  My Dashboard
                </Link>

                {user?.role?.toLowerCase() === "user" && (
                  <Link
                    to="/my-requests"
                    onClick={() => setopenNav(false)}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <FileText size={18} />
                    My Requests
                  </Link>
                )}

                {user?.role?.toLowerCase() === "service" && (
                  <Link
                    to="/CustomerService"
                    onClick={() => setopenNav(false)}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Headset size={18} />
                    Customer Service
                  </Link>
                )}
              </>
            )}

            {/* Get Started */}
            {!user && (
              <Link
                to="/login"
                onClick={() => setopenNav(false)}
                className="rounded-full bg-linear-to-r from-primary to-blue-400 px-6 py-2 text-[18px] text-white"
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
