import React from "react";

const ProductFilters = ({
  selectedType,
  setSelectedType,
  selectedForm,
  setSelectedForm,
  selectedSubstance,
  setSelectedSubstance,
  searchTerm,
  setSearchTerm,
}) => {
  const productTypes = [
    "All Types",
    "OTC Drug",
    "Prescription Drug",
    "Supplements",
    "Medical Device",
    "Cosmetic",
  ];

  const productForms = [
    "All Forms",
    "Tablets",
    "Capsules",
    "Syrup",
    "Cream",
    "Gel",
    "Drops",
    "Spray",
    "Powder",
    "Ointment",
    "Suppositories",
  ];

  const activeSubstances = [
    "All Substances",
    "Paracetamol",
    "Amoxicillin",
    "Ibuprofen",
    "Vitamin C",
    "Dextromethorphan",
    "Hydrocortisone",
    "Cholecalciferol",
    "Sodium Chloride",
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Section Heading */}
      <div className="mb-8">
        <span className="text-primary font-semibold uppercase tracking-wider">
          Product Portfolio
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">
          Explore Our Products
        </h2>

        <p className="text-gray-600 mt-3">
          Browse our pharmaceutical products by type, form, or active substance.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type
            </label>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form
            </label>

            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {productForms.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </select>
          </div>

          {/* Active Substance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active Substance
            </label>

            <select
              value={selectedSubstance}
              onChange={(e) => setSelectedSubstance(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {activeSubstances.map((substance) => (
                <option key={substance} value={substance}>
                  {substance}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;
