import React from "react";
import { ArrowRight, Icon } from "lucide-react";
const ServiceCard = ({ title, description, onReadMore, Icon }) => {
  return (
    <div className="group cursor-pointer relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10" />

      <div>
        <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {Icon && <Icon className="w-7 h-7" />}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div>
        <button
          onClick={onReadMore}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#105cca] group/btn transition-colors duration-200 cursor-pointer"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
