import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

import { SITE } from "../../../constants/site";

const AnnouncementBar = () => {
  return (
    <section className="hidden md:block bg-primary text-primary-content">
      <div className="container-x">
        <div className="flex h-10 items-center justify-between text-sm">
          {/* Left */}

          <div className="flex items-center gap-6">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 hover:opacity-80 transition-default"
            >
              <FiPhone />

              {SITE.phone}
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 hover:opacity-80 transition-default"
            >
              <FiMail />

              {SITE.email}
            </a>
          </div>

          {/* Center */}

          <p className="font-medium tracking-wide">{SITE.announcement}</p>

          {/* Right */}

          <div className="flex items-center gap-4">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-default"
            >
              <FiFacebook />
            </a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-default"
            >
              <FiInstagram />
            </a>

            <span className="flex items-center gap-2">
              <FiMapPin />

              {SITE.address}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementBar;
