import React, { useEffect } from "react";
import Navbar from "../Component/Navbar";
import Header from "../Component/Header";
import About from "../Component/About";
import Service from "../Component/Service";
import NewsandLatesr from "../Component/NewsandLatest";
import Contact from "../Component/Contact";

const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <Service />
      <NewsandLatesr />
      <Contact />
    </div>
  );
};

export default Home;
