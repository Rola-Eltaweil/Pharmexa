import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Plus,
  TrendingUp,
  Pill,
  ClipboardList,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import AddProductModal from "./AddProduct";
import { useSelector } from "react-redux";
const AdminDashboard = () => {
  const [open, setopen] = useState(false);
  const products = useSelector((state) => state.product.products);
  const OTC = products.filter((product) => product.type === "OTC Drug");
  const per = products.filter(
    (prosuct) => prosuct.type === "Prescription Drug",
  );
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ================= Sidebar ================= */}
      {/* ================= Main ================= */}
      <main className="flex-1 min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Administration</p>

              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Dashboard
              </h2>
            </div>
            {open && <AddProductModal onClose={() => setopen(false)} />}
            <button
              onClick={() => setopen(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition shadow-sm"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-10">
          {/* Welcome */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900">
              Welcome back, Admin
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Here's what's happening with your pharmaceutical products.
            </p>
          </div>

          {/* ================= Stats ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* Total Products */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package className="text-primary" size={21} />
                </div>

                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <TrendingUp size={14} />
                  12.5%
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-5">Total Products</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {products?.length}
              </h3>
            </div>

            {/* OTC */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Pill className="text-emerald-600" size={21} />
              </div>

              <p className="text-sm text-slate-500 mt-5">OTC Products</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {OTC.length}
              </h3>
            </div>

            {/* Prescription */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <ClipboardList className="text-purple-600" size={21} />
              </div>

              <p className="text-sm text-slate-500 mt-5">Prescription Drugs</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {per.length}
              </h3>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                <Activity className="text-orange-500" size={21} />
              </div>

              <p className="text-sm text-slate-500 mt-5">Product Categories</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">6</h3>
            </div>
          </div>

          {/* ================= Bottom Section ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* Recent Products */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Recent Products
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Recently added products
                  </p>
                </div>

                <Link to={"/dashboard/products"}>
                  <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    View all
                    <ArrowUpRight size={15} />
                  </button>
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {/* Product 1 */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                    💊
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Paracetamol 500mg
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Tablets · Paracetamol
                    </p>
                  </div>

                  <span className="hidden sm:block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                    OTC Drug
                  </span>

                  <button className="text-slate-400 hover:text-slate-700">
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                {/* Product 2 */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                    💊
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Amoxicillin 500mg
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Capsules · Amoxicillin
                    </p>
                  </div>

                  <span className="hidden sm:block px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                    Prescription
                  </span>

                  <button className="text-slate-400 hover:text-slate-700">
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                {/* Product 3 */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
                    🧴
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Vitamin C 1000mg
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Powder · Vitamin C
                    </p>
                  </div>

                  <span className="hidden sm:block px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-medium">
                    Supplement
                  </span>

                  <button className="text-slate-400 hover:text-slate-700">
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Quick Actions</h3>

              <p className="text-xs text-slate-400 mt-1">
                Manage your content quickly
              </p>

              <div className="space-y-3 mt-6">
                <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-blue-50/50 transition text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Plus size={19} className="text-primary" />
                  </div>

                  <div onClick={() => setopen(!open)}>
                    <p className="text-sm font-semibold text-slate-800">
                      Add Product
                    </p>

                    <p className="text-xs text-slate-400">
                      Create a new product
                    </p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-blue-50/50 transition text-left">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Package size={19} className="text-emerald-600" />
                  </div>

                  <Link to={"/dashboard/products"}>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Manage Products
                      </p>

                      <p className="text-xs text-slate-400">
                        View and edit products
                      </p>
                    </div>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
