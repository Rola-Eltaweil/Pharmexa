import { ArrowRight } from "lucide-react";

const ServiceCard = ({ title, description, category, Icon }) => {
  return (
    <div className="group relative  cursor-pointer bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10" />

      <div>
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {Icon && <Icon className="w-7 h-7" />}
        </div>

        {/* Category */}
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
