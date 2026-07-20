import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Shop from "../pages/Shop";

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
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
