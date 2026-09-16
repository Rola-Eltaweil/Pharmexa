import React from "react";
import ServiceCard from "./ServiceCard";
import {
  ArrowRight,
  FlaskConical,
  TestTube2,
  Handshake,
  Factory,
} from "lucide-react";
const Service = () => {
  const servicesData = [
    {
      id: 1,
      title: "Pharmaceutical Manufacturing",
      description:
        "State-of-the-art facilities compliant with global GMP standards to produce high-quality oral solids, liquids, and sterile products.",
      icon: Factory,
    },
    {
      id: 2,
      title: "Product Development",
      description:
        "End-to-end formulation development, analytical testing, and process optimization tailored for modern healthcare needs.",
      icon: FlaskConical,
    },
    {
      id: 3,
      title: "Quality Control & Testing",
      description:
        "Rigorously testing raw materials and finished pharmaceutical products ensuring maximum safety, purity, and compliance.",
      icon: TestTube2,
    },
    {
      id: 4,
      title: "Contract Manufacturing",
      description:
        "Reliable CMO and CDMO partnership solutions offering flexible capacity, scale-up expertise, and full regulatory support.",
      icon: Handshake,
    },
  ];
  return (
    <div id="service" className="container py-25 ">
      <h2 className="text-primary font-bold text-5xl flex justify-center items-center ">
        {" "}
        WHAT WE DO
      </h2>
      <span className="flex justify-center items-center pt-2 text-[24px] text-blue-700 font-medium">
        Comprehensive Pharmaceutical Solutions
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-3 py-10">
        {servicesData.map((data, index) => (
          <ServiceCard
            title={data.title}
            key={index}
            description={data.description}
            onReadMore={data.onReadMore}
            Icon={data.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
