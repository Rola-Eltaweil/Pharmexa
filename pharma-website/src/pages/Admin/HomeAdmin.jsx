import React, { useEffect } from "react";
import Aside from "../Aside";
import { Outlet } from "react-router-dom";
import { getData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";
import { setProducts } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  // Products from Redux
  const products = useSelector((state) => state.product.products);

  const Allproducts = async () => {
    try {
      const response = await getData(Endpoint.AllProduct.url);

      dispatch(setProducts(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Allproducts();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Aside />

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeAdmin;
