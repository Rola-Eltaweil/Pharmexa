import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
const nav = () => {
  const [openNav, setopenNav] = useState(false);

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
          <a href="#services" className="nav-item">
            Services
          </a>
          <Link to="/product">
            <p className="nav-item">Products</p>
          </Link>
          <a href="#manufacturing" className="nav-item">
            Manufacturing
          </a>

          <a
            href="#contact"
            className="rounded-full bg-linear-to-r from-primary to-blue-400 px-6 py-2 text-[18px] text-white"
          >
            Get Started
          </a>
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
              href="#about"
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
