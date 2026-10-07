import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const TeamMemberProtected = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails || userDetails?.role?.toLowerCase() !== "teammember") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
