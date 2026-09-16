import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData } from "./utils/apiSummary";
import { Endpoint } from "./utils/routes";
import { setuserDetails } from "./redux/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // إخفاء الـ Navbar والـ Footer في مسارات الأدمن إذا أردت
  const isAdminRoute = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const userdetails = async () => {
      try {
        const data = await getData(Endpoint.userDetails.url);
        dispatch(setuserDetails(data?.data?.userdetails || null));
      } catch (error) {
        console.log("USER DETAILS ERROR:", error);
        // في حال الخطأ نرسل null لإيقاف الـ loading
        dispatch(setuserDetails(null));
      }
    };

    userdetails();
  }, [dispatch]);

  return (
    <div>
      {!isAdminRoute && <Navbar />}

      <Outlet />

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
