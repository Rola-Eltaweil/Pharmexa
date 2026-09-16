import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/store.js";
import router from "./routes/routing.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer />
  </StrictMode>,
);
