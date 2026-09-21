import { useEffect, useState } from "react";

import ServiceCard from "./ServiceCard";

import { FlaskConical, TestTube2, Handshake, Factory } from "lucide-react";

import { getData } from "../utils/apiSummary";
import { Endpoint } from "../utils/routes";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const iconMap = {
    Factory: Factory,
    FlaskConical: FlaskConical,
    TestTube2: TestTube2,
    Handshake: Handshake,
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getData(Endpoint.allServices.url);

      setServices(response.data.data || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div id="service" className="container py-25">
      <h2 className="text-primary font-bold text-5xl flex justify-center items-center">
        WHAT WE DO
      </h2>

      <span className="flex justify-center items-center pt-2 text-[24px] text-blue-700 font-medium">
        Comprehensive Pharmaceutical Solutions
      </span>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <p className="text-gray-500">Loading services...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-16">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-10">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Factory;

            return (
              <ServiceCard
                key={service._id}
                title={service.title}
                description={service.description}
                category={service.category}
                Icon={Icon}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Service;
