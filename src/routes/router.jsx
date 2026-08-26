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
import { Navigate } from "react-router-dom";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Settings from "../pages/dashboard/Settings";

import { ROUTES } from "../constants/routes";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminOverview from "../pages/admin/AdminOverview";
import AdminProducts from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminPlaceholder from "../pages/admin/AdminPlaceholder";
import OrderSuccess from "../pages/OrderSuccess";
import TrackOrder from "../pages/TrackOrder";
import OrderDetails from "../pages/dashboard/OrderDetails";
import Addresses from "../pages/dashboard/Addresses";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails";
import AdminSettings from "../pages/admin/AdminSettings";

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
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success/:orderNumber", element: <OrderSuccess /> },
      { path: "track-order", element: <TrackOrder /> },
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
        { path: "orders/:id", element: <OrderDetails /> },
        { path: "addresses", element: <Addresses /> },

        {
            path: "wishlist",
            element: <Navigate to={ROUTES.WISHLIST} replace />,
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
      { path: "orders", element: <AdminOrders /> },
      { path: "orders/:id", element: <AdminOrderDetails /> },
      { path: "customers", element: <AdminPlaceholder /> },
      { path: "reviews", element: <AdminPlaceholder /> },
      { path: "coupons", element: <AdminPlaceholder /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },

]);
