import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Routing from "./routes/routing.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
    <ToastContainer />
  </StrictMode>,
);
