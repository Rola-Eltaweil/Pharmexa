import { ChevronDown, LogOut, User } from "lucide-react";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../utils/apiSummary";
import { Endpoint } from "../utils/routes";
import { clearUser } from "../redux/userSlice";
const nav = () => {
  const [openNav, setopenNav] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
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
      <nav className="flex items-center justify-between py-4  container ">
        <Link to={"/"}>
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-wide text-primary">
              PHARM<span className="font-light">EXA</span>
            </span>
          </div>
        </Link>

        <FaBarsStaggered
          onClick={() => setopenNav(true)}
          className="text-primary text-3xl cursor-pointer flex justify-center items-end md:hidden "
        />
        {/* Navigation */}
        <div className=" hidden md:flex items-center gap-8 ">
          <a href="#about " className="nav-item ">
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
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 px-4 py-2 hover:bg-gray-50 transition"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <User size={19} />
                </div>

                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <ChevronDown
                  size={17}
                  className={`text-gray-500 transition-transform ${
                    openDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute z-100 cursor-pointer right-0 top-full mt-2 w-56 rounded-xl bg-white p-2 shadow-lg border border-gray-100 ${
                  openDropdown ? "block" : "hidden"
                }`}
              >
                <Link to={"customer_Dahboard"}>
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 mt-1 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <p className="rounded-full bg-linear-to-r from-primary to-blue-400 px-6 py-2 text-[18px] text-white">
                Get Started
              </p>
            </Link>
          )}
        </div>
        {openNav && (
          <div className="absolute top-20 left-0 w-full bg-nav flex flex-col items-center gap-8 py-10 md:hidden">
            <a
              href="#about"
              className="inline-block px-3 py-2 text-gray-700 font-medium transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              About
            </a>
            <a
              href="#service"
              className="inline-block px-3 py-2 text-gray-700 font-medium transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              Services
            </a>
            <Link to={"/product"}>
              <a
                href=""
                className="inline-block px-3 py-2 text-gray-700 font-medium transition-transform duration-300 hover:scale-110 hover:text-primary"
              >
                Products
              </a>
            </Link>
            <a
              href="#about"
              className="inline-block px-3 py-2 text-gray-700 font-medium transition-transform duration-300 hover:scale-110 hover:text-primary"
            >
              Manufacturing
            </a>
            <a
              href="#contact"
              className="rounded-full bg-linear-to-r from-primary to-blue-400 px-6 py-2 text-[18px] text-white"
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default nav;
