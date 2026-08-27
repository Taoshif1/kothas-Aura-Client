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
import useAuth from"../../../hooks/useAuth";
import useStoreSettings from"../../../hooks/useStoreSettings";

const Footer = () => {
  const{dbUser}=useAuth();const{settings}=useStoreSettings();const contact=settings.contact||{},social=settings.social||{};const accountPath=dbUser?.role==="admin"?ROUTES.ADMIN:dbUser?ROUTES.DASHBOARD:ROUTES.LOGIN;
  return (
    <footer className="mt-24 bg-gradient-to-b from-neutral to-[#24181b] text-neutral-content">
      <div className="container-x py-20">
        {/* Brand */}

        <div className="border-b border-white/10 pb-12 text-center">
          <h2 className="heading text-5xl">{settings.storeName||SITE.name}</h2>

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
              <Link to={ROUTES.WISHLIST} className="footer-link">Wishlist</Link>
              <Link to="/track-order" className="footer-link">Track Order</Link>
              <Link to={accountPath} className="footer-link">My Account</Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-6 font-semibold uppercase tracking-widest text-primary">
              Contact
            </h3>

            <div className="space-y-4">
              <a href={`tel:${contact.phone||SITE.phone}`} className="flex items-center gap-3 hover:text-primary">
                <FiPhone />

                {contact.phone||SITE.phone}
              </a>

              <a href={`mailto:${contact.email||SITE.email}`} className="flex items-center gap-3 hover:text-primary">
                <FiMail />

                {contact.email||SITE.email}
              </a>

              <p className="flex items-center gap-3">
                <FiMapPin />

                {contact.address||SITE.address}
              </p>

              <div className="mt-8 flex gap-5 text-2xl">
                <a
                  href={social.facebook||SITE.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <FiFacebook />
                </a>

                <a
                  href={social.instagram||SITE.instagram}
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
