import {
  ClipboardList,
  LayoutDashboard,
  Package,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router-dom";
const Aside = () => {
  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col">
      {/* Logo */}
      <Link to={"/dashboard"}>
        <div className="px-6 py-7 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-primary">PHARMEXA</h1>

          <p className="text-xs text-slate-400 mt-1">
            Pharmaceutical Management
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>

        <nav className="flex flex-col gap-3">
          <Link to={"/dashboard"}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white shadow-sm cursor-pointer">
              <LayoutDashboard size={19} />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
          </Link>

          <Link to={"/dashboard/products"}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer">
              <Package size={19} />
              <span className="text-sm font-medium">Products</span>
            </button>
          </Link>
          <Link to={"/dashboard/service"}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer">
              <BriefcaseBusiness size={19} />
              <span className="text-sm font-medium">Service</span>
            </button>
          </Link>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer">
            <ClipboardList size={19} />
            <span className="text-sm font-medium">Content</span>
          </button>
        </nav>
      </div>

      {/* Admin */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">A</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-xs text-slate-400 truncate">
              admin@pharmixa.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
