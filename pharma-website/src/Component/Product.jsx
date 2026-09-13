import React, { useEffect, useState } from "react";
import ProductVisual from "../pages/ProductVisual ";
import ProductFilters from "./ProductFilter";
import ProductCard from "./ProdcutCard";
import { getData } from "../utils/apiSummary";
import { Endpoint } from "../utils/routes";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();

  // Products from Redux
  const products = useSelector((state) => state.product.products);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedForm, setSelectedForm] = useState("All Forms");
  const [selectedSubstance, setSelectedSubstance] = useState("All Substances");

  // Get all products
  const Allproducts = async () => {
    try {
      const response = await getData(Endpoint.AllProduct.url);

      dispatch(setProducts(response?.data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Allproducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "All Types" || product.type === selectedType;

    const matchesForm =
      selectedForm === "All Forms" || product.form === selectedForm;

    const matchesSubstance =
      selectedSubstance === "All Substances" ||
      product.activeSubstance === selectedSubstance;

    return matchesSearch && matchesType && matchesForm && matchesSubstance;
  });

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="flex sm:flex-row flex-col py-6">
        <div className="flex-2 flex items-center gap-4">
          <p className="text-[17px] text-[rgb(24,135,194)]">
            <span className="block pb-3 text-[24px] text-primary font-semibold">
              Our Products
            </span>
            Advancing Medicine Through Precision Manufacturing. We develop and
            manufacture high-quality pharmaceutical products designed to meet
            diverse healthcare needs. Our portfolio combines quality, safety,
            and precision to deliver reliable healthcare solutions across
            different product categories and pharmaceutical forms.
          </p>
        </div>

        <div className="flex-3">
          <ProductVisual />
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
        selectedSubstance={selectedSubstance}
        setSelectedSubstance={setSelectedSubstance}
      />

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data) => (
            <ProductCard key={data._id} data={data} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
