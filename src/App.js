import React from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import RoutesData from "./services/routesdata";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  return (
    <div>
      <ToastContainer />
      <RoutesData />
    </div>
  );
}
