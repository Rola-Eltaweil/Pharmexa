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

  const products = useSelector((state) => state.product.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedForm, setSelectedForm] = useState("All Forms");
  const [selectedSubstance, setSelectedSubstance] = useState("All Substances");

  const searchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      if (selectedType !== "All Types") {
        params.append("type", selectedType);
      }

      if (selectedForm !== "All Forms") {
        params.append("form", selectedForm);
      }

      if (selectedSubstance !== "All Substances") {
        params.append("activeSubstance", selectedSubstance);
      }

      const url = params.toString()
        ? `${Endpoint.searchProduct.url}?${params.toString()}`
        : Endpoint.AllProductuser.url;

      const response = await getData(url);

      dispatch(setProducts(response?.data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [searchTerm, selectedType, selectedForm, selectedSubstance]);

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
        {products.length > 0 ? (
          products.map((data) => <ProductCard key={data._id} data={data} />)
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
