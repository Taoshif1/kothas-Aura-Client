import { FiHeart, FiHome, FiPackage, FiSettings, FiUser } from "react-icons/fi";
import { ROUTES } from "./routes";

export const SITE = {
  name: "Kotha's Aura",
  tagline: "Luxury Beauty • Jewelry • Lifestyle",
  description: "Premium Beauty & Lifestyle Store for Modern Women.",
  phone: "+8801XXXXXXXXX",
  email: "hello@kothasaura.com",
  facebook: "https://facebook.com/kothasaura",
  instagram: "https://instagram.com/kothasaura",
  whatsapp: "https://wa.me/8801XXXXXXXX",
  address: "Dhaka, Bangladesh",
  announcement: "✨ Free Delivery on Orders Above ৳2000",
  navLinks: [
    {
      name: "Home",
      path: ROUTES.HOME,
    },
    {
      name: "Shop",
      path: ROUTES.SHOP,
    },
    {
      name: "About",
      path: ROUTES.ABOUT,
    },
    {
      name: "Contact",
      path: ROUTES.CONTACT,
    },
  ],
};

export const dashboardLinks = [
  {
    name: "Dashboard",
    path: ROUTES.DASHBOARD_HOME,
    icon: FiHome,
  },
  {
    name: "My Profile",
    path: ROUTES.PROFILE,
    icon: FiUser,
  },
  {
    name: "Orders",
    path: ROUTES.ORDERS,
    icon: FiPackage,
  },
  {
    name: "Wishlist",
    path: ROUTES.WISHLIST,
    icon: FiHeart,
  },
  {
    name: "Settings",
    path: ROUTES.SETTINGS,
    icon: FiSettings,
  },
];
