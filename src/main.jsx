import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import BuyerHome from "./BuyerHome.jsx";
import SellerHome from "./SellerHome.jsx";

import "./index.css";
import SellerProfile from "./SellerProfile.jsx";
import EditProperty from "./EditProperty.jsx";
import SellerInfo from "./SellerInfo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/buyer-home",
    element: <BuyerHome />,
  },
  {
    path: "/seller-home",
    element: <SellerHome />,
  },
  {
    path: "/seller-profile",
    element: <SellerProfile />,
  },
  {
    path: "/seller-info",
    element: <SellerInfo />,
  },
  {
    path: "/edit-property",
    element: <EditProperty />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
