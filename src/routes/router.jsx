import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyProfile from "../pages/dashboard/MyProfile";
import MyOrders from "../pages/dashboard/MyOrders";
import Wishlist from "../pages/dashboard/Wishlist";
import Settings from "../pages/dashboard/Settings";

import { ROUTES } from "../constants/routes";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminOverview from "../pages/admin/AdminOverview";
import AdminProducts from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminPlaceholder from "../pages/admin/AdminPlaceholder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: ROUTES.DASHBOARD,

    element: (
        <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>
    ),

    children: [

        {
            index: true,
            element: <DashboardHome />,
        },

        {
            path: "profile",
            element: <MyProfile />,
        },

        {
            path: "orders",
            element: <MyOrders />,
        },

        {
            path: "wishlist",
            element: <Wishlist />,
        },

        {
            path: "settings",
            element: <Settings />,
        },
    ],
},
  {
    path: ROUTES.ADMIN,
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/add", element: <ProductForm /> },
      { path: "products/:id/edit", element: <ProductForm /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "orders", element: <AdminPlaceholder /> },
      { path: "customers", element: <AdminPlaceholder /> },
      { path: "reviews", element: <AdminPlaceholder /> },
      { path: "coupons", element: <AdminPlaceholder /> },
      { path: "settings", element: <AdminPlaceholder /> },
    ],
  },

]);
