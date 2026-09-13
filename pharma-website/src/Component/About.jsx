import React from "react";
import img from "../assets/slide2.jpg";
const About = () => {
  return (
    <div id="about">
      <div className="flex lg:flex-row flex-col justify-between  gap-6 items-center pt-20 md:pt-30 container">
        <div>
          <span className="text-xl sm:text-3xl md:text-5xl text-primary font-semibold pb-5 inline-block">
            About Pharmexa
          </span>
          <p className="text-gray-500 leading-6 md:leading-8  text-[16px] md:text-[19px] ">
            We are a pharmaceutical manufacturing company committed to
            developing and producing high-quality healthcare solutions that meet
            the evolving needs of patients and healthcare professionals. With a
            strong focus on innovation, quality, and safety, we combine advanced
            manufacturing technologies with scientific expertise to deliver
            reliable pharmaceutical products. Our commitment to excellence
            drives us to continuously improve our processes .
          </p>
        </div>
        <div>
          <img src={img} className=" md:max-w-200 max-h-80 rounded-3xl " />
        </div>
      </div>
      <div className="flex flex-row flex-wrap  items-start justify-start gap-4 md:gap-12 container py-5">
        <div className="flex gap-2 items-center">
          <h3 className=" text-2xl md:text-3xl font-semibold md:font-bold text-[rgb(23_116_253)]">
            20+
          </h3>
          <p className=" text-md md:text-lg">Years Experience</p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-2xl md:text-3xl font-semibold md:font-bold text-[rgb(23_116_253)]">
            50+
          </h3>
          <p className="text-md md:text-lg">Products</p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-2xl md:text-3xl font-semibold md:font-bold text-[rgb(23_116_253)]">
            10+
          </h3>
          <p className="text-md md:text-lg">Markets</p>
        </div>
      </div>
    </div>
  );
};

export default About;
