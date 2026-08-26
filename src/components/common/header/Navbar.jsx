import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
  FiLogOut,
  FiSliders,
} from "react-icons/fi";

import Logo from "./Logo";
import { SITE } from "../../../constants/site";
import { ROUTES } from "../../../constants/routes";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out safely. See you soon!");
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Helper to extract a single premium initial letter
  const getInitial = () => {
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "K";
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-base-100/80 backdrop-blur-xl shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-x">
          <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
            {/* LEFT */}
            <div className="flex items-center">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden text-2xl"
              >
                {open ? <FiX /> : <FiMenu />}
              </button>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {SITE.navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* CENTER */}
            <div className="flex justify-center">
              <Logo />
            </div>

            {/* RIGHT */}
            <div className="flex justify-end items-center gap-1">
              <button className="icon-button">
                <FiSearch />
              </button>

              <button className="icon-button">
                <FiHeart />
              </button>

              <Link to={ROUTES.CART} className="icon-button">
                <FiShoppingBag />
              </Link>

              {/* AUTH CONDITIONAL DROP DOWN */}
              {user ? (
                <div className="dropdown dropdown-end ml-1">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar border border-base-300/60 bg-base-200"
                  >
                    <div className="w-9 rounded-full flex items-center justify-center">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User profile"}
                        />
                      ) : (
                        <span className="text-sm font-bold text-primary flex h-full items-center justify-center tracking-wide">
                          {getInitial()}
                        </span>
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[60] p-3 shadow-[0_20px_50px_rgba(63,46,51,.12)] bg-white border border-base-200 rounded-2xl w-56 text-neutral space-y-1"
                  >
                    <li className="px-3 py-2 border-b border-base-100 mb-1">
                      <p className="font-semibold text-base text-neutral line-clamp-1 p-0">
                        {user.displayName || "Welcome Back"}
                      </p>
                      <p className="text-xs text-neutral/50 font-normal line-clamp-1 p-0 mt-0.5">
                        {user.email}
                      </p>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="py-2.5 px-3 rounded-xl flex items-center gap-2 hover:text-primary"
                      >
                        <FiSliders className="text-base" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="py-2.5 px-3 rounded-xl text-error hover:bg-error/10 flex items-center gap-2"
                      >
                        <FiLogOut className="text-base" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to={ROUTES.LOGIN} className="icon-button">
                  <FiUser />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-base-100 shadow-2xl transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <Logo />
          <button onClick={() => setOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6 mt-6">
          {SITE.navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-lg ${isActive ? "text-primary" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
