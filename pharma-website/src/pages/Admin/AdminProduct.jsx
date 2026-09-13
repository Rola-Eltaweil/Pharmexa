import React, { useEffect, useState } from "react";
import { Plus, Trash2, Package, Pencil } from "lucide-react";
import AddProductModal from "./AddProduct";
import { getData, deleteData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/productSlice";
import EditProductModal from "./EditProductModal";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editdata, seteditdata] = useState(false);
  const [selectedproduct, setselectedproduct] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const deleteone = await deleteData(`${Endpoint.deleteProduct.url}/${id}`);
      if (deleteone) {
        console.log(deleteone);
        toast.success(deleteone.data.message);
        Allproducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Administration</p>

              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Products
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage your pharmaceutical products.
              </p>
            </div>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition"
            >
              <Plus size={19} />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Products count */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package size={20} className="text-primary" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">All Products</h2>

            <p className="text-sm text-slate-500">
              {products.length} products in your catalog
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {products.map((product) => (
            <div
              key={product?._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition duration-300"
            >
              {/* Product Info */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                  {product?.type}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mt-4">
                  {product?.name}
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-1">
                  {product?.description}
                </p>

                {/* Product Details */}
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Form</span>

                    <span className="font-medium text-gray-800 text-right">
                      {product?.form}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Active Substance</span>

                    <span className="font-medium text-gray-800 text-right">
                      {product?.activeSubstance}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center gap-2 mt-6 pt-5 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setselectedproduct(product?._id);
                      seteditdata(true);
                    }}
                    title="Edit Product"
                    className="w-10 cursor-pointer h-10 flex items-center justify-center rounded-xl border border-primary/20 text-primary hover:bg-primary/5 transition"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(product?._id)}
                    title="Delete Product"
                    className="w-10 cursor-pointer h-10 flex items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editdata && (
        <EditProductModal
          Allproducts={Allproducts}
          selectedproduct={selectedproduct}
          onClose={() => seteditdata(false)}
        />
      )}
      {/* Add Product Modal */}
      {isAddProductOpen && (
        <AddProductModal
          onClose={() => setIsAddProductOpen(false)}
          Allproducts={Allproducts}
        />
      )}
    </div>
  );
};

export default AdminProducts;
