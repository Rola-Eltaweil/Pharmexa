import "./index.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;

//  <Header />
//       <About />
//       <Service />
//       <NewsandLatesr />
//       <Contact />
//       <Footer />
