import { NavLink } from "react-router-dom";

import { FiGrid, FiHeart, FiMapPin, FiPackage, FiSettings, FiUser } from "react-icons/fi";

const DashboardSidebar = () => {
  return (
    <aside className="w-full bg-white border-b border-base-300 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="hidden p-8 md:block">
        <h2 className="heading text-3xl">Dashboard</h2>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 py-3 md:block md:space-y-2 md:px-5 md:py-0">
        <NavLink
          end
          to="/dashboard"
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiGrid />
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiUser />
          My Profile
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`}
        >
          <FiPackage />
          Orders
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiHeart />
          Wishlist
        </NavLink>

        <NavLink to="/dashboard/addresses" className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 transition ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`}>
          <FiMapPin /> Addresses
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiSettings />
          Account & Security
        </NavLink>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
