import React, { useState } from "react";
import { X } from "lucide-react";
import { Endpoint } from "../../utils/routes";
import { postData } from "../../utils/apiSummary";
import { toast } from "react-toastify";
const AddProductModal = ({ onClose, Allproducts }) => {
  const [data, setdata] = useState({
    name: "",
    type: "",
    form: "",
    activeSubstance: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addproduct = await postData(Endpoint.addProduct.url, data);
      if (addproduct) {
        toast.success(addproduct.data.message);
        onClose();
        Allproducts();
      }
    } catch (error) {
      console.log(error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new pharmaceutical product to your catalog.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition shrink-0"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="e.g. Paracetamol 500mg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                required
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>

              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                required
              >
                <option value="">Select type</option>
                <option value="OTC Drug">OTC Drug</option>
                <option value="Prescription Drug">Prescription Drug</option>
                <option value="Supplements">Supplements</option>
                <option value="Medical Device">Medical Device</option>
                <option value="Cosmetic">Cosmetic</option>
              </select>
            </div>

            {/* Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form
              </label>

              <select
                name="form"
                value={data.form}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                required
              >
                <option value="">Select form</option>
                <option value="Tablets">Tablets</option>
                <option value="Capsules">Capsules</option>
                <option value="Syrup">Syrup</option>
                <option value="Cream">Cream</option>
                <option value="Gel">Gel</option>
                <option value="Drops">Drops</option>
                <option value="Spray">Spray</option>
                <option value="Powder">Powder</option>
                <option value="Ointment">Ointment</option>
                <option value="Suppositories">Suppositories</option>
              </select>
            </div>

            {/* Active Substance */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Active Substance
              </label>

              <input
                type="text"
                name="activeSubstance"
                value={data.activeSubstance}
                onChange={handleChange}
                placeholder="e.g. Paracetamol"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter product description..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                required
              ></textarea>
            </div>

            {/* Product Image */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image URL
                <span className="text-gray-400 font-normal ml-2">
                  (Optional)
                </span>
              </label>

              <input
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
                placeholder="https://example.com/product-image.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div> */}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-7 pt-5 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl cursor-pointer border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 cursor-pointer rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
