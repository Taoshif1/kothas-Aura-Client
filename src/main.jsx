import { createRoot } from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";

import AuthProvider from "./providers/AuthProvider";
import CartProvider from "./providers/CartProvider";
import WishlistProvider from "./providers/WishlistProvider";
import { router } from "./routes/router";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
    </AuthProvider>
  </HelmetProvider>,
);
