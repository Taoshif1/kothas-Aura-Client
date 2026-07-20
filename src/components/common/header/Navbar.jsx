import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

import Logo from "./Logo";
import { SITE } from "../../../constants/site";
import { ROUTES } from "../../../constants/routes";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              {/* Mobile */}

              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden text-2xl"
              >
                {open ? <FiX /> : <FiMenu />}
              </button>

              {/* Desktop */}

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

              <Link to={ROUTES.LOGIN} className="icon-button">
                <FiUser />
              </Link>
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
