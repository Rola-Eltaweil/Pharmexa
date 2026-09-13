import React from "react";

const ProductCard = ({ data }) => {
  return (
    <div className="bg-white cursor-pointer rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      <div className="p-6">
        {/* Product Type */}
        <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
          {data?.type}
        </span>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mt-4">{data?.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          {data?.description}
        </p>

        {/* Product Details */}
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Form</span>

            <span className="font-medium text-gray-800">{data?.form}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Active Substance</span>

            <span className="font-medium text-gray-800">
              {data?.activeSubstance}
            </span>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
