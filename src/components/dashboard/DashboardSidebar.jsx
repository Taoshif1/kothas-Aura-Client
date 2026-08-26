import { NavLink } from "react-router-dom";

import { FiGrid, FiHeart, FiPackage, FiSettings, FiUser } from "react-icons/fi";

const DashboardSidebar = () => {
  return (
    <aside className="hidden md:block w-72 min-h-screen bg-white border-r border-base-300">
      <div className="p-8">
        <h2 className="heading text-3xl">Dashboard</h2>
      </div>

      <nav className="space-y-2 px-5">
        <NavLink
          end
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-5 py-3 transition ${
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
            `flex items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiUser />
          My Profile
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className="flex items-center gap-3 rounded-xl px-5 py-3 hover:bg-base-200"
        >
          <FiPackage />
          Orders
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiHeart />
          Wishlist
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-5 py-3 transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-200"
            }`
          }
        >
          <FiSettings />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
