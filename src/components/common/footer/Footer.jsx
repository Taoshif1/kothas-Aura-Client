import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { SITE } from "../../../constants/site";
import { ROUTES } from "../../../constants/routes";

const Footer = () => {
  return (
    <footer className="mt-24 bg-gradient-to-b from-neutral to-[#24181b] text-neutral-content">
      <div className="container-x py-20">
        {/* Brand */}

        <div className="border-b border-white/10 pb-12 text-center">
          <h2 className="heading text-5xl">{SITE.name}</h2>

          <p className="mt-4 tracking-[4px] uppercase text-white/70">
            {SITE.tagline}
          </p>
        </div>

        {/* Footer Grid */}

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-3">
          {/* Links */}

          <div>
            <h3 className="mb-6 font-semibold uppercase tracking-widest text-primary">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link to={ROUTES.HOME} className="footer-link">
                Home
              </Link>

              <Link to={ROUTES.SHOP} className="footer-link">
                Shop
              </Link>

              <Link to={ROUTES.ABOUT} className="footer-link">
                About
              </Link>

              <Link to={ROUTES.CONTACT} className="footer-link">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer */}

          <div>
            <h3 className="mb-6 font-semibold uppercase tracking-widest text-primary">
              Customer
            </h3>

            <div className="space-y-3">
              <p className="footer-link">Wishlist</p>

              <p className="footer-link">Track Order</p>

              <p className="footer-link">My Account</p>

              <p className="footer-link">FAQ</p>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-6 font-semibold uppercase tracking-widest text-primary">
              Contact
            </h3>

            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <FiPhone />

                {SITE.phone}
              </p>

              <p className="flex items-center gap-3">
                <FiMail />

                {SITE.email}
              </p>

              <p className="flex items-center gap-3">
                <FiMapPin />

                {SITE.address}
              </p>

              <div className="mt-8 flex gap-5 text-2xl">
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <FiFacebook />
                </a>

                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <FiInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
          <p>
            Website Designed & Developed by{" "}
            <a
              href="https://github.com/Taoshif1"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Taoshiflex Studio
            </a>
          </p>

          <p className="mt-3">
            © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
