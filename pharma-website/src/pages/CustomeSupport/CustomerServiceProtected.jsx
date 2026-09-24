import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// AdminProtect.jsx
export const CustomerServiceProtected = () => {
  const userDetails = useSelector((state) => state?.user?.userDetails);
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return <div>Loading...</div>; // يمنع التوجيه حتى اكتمال جلب البيانات
  }

  // التحقق من صلاحية الأدمن
  if (!userDetails || userDetails?.role?.toLowerCase() !== "service") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
