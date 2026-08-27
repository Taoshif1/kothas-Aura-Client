import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

import { SITE } from "../../../constants/site";
import useStoreSettings from "../../../hooks/useStoreSettings";

const AnnouncementBar = () => {
  const{settings}=useStoreSettings();const contact=settings.contact||{},social=settings.social||{},announcement=settings.announcement||{};
  if(announcement.enabled===false)return null;
  return (
    <section className="hidden md:block bg-primary text-primary-content">
      <div className="container-x">
        <div className="flex h-10 items-center justify-between text-sm">
          {/* Left */}

          <div className="flex items-center gap-6">
            <a
              href={`tel:${contact.phone||SITE.phone}`}
              className="flex items-center gap-2 hover:opacity-80 transition-default"
            >
              <FiPhone />

              {contact.phone||SITE.phone}
            </a>

            <a
              href={`mailto:${contact.email||SITE.email}`}
              className="flex items-center gap-2 hover:opacity-80 transition-default"
            >
              <FiMail />

              {contact.email||SITE.email}
            </a>
          </div>

          {/* Center */}

          <p className="font-medium tracking-wide">{announcement.text||SITE.announcement}</p>

          {/* Right */}

          <div className="flex items-center gap-4">
            <a
              href={social.facebook||SITE.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-default"
            >
              <FiFacebook />
            </a>

            <a
              href={social.instagram||SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-default"
            >
              <FiInstagram />
            </a>

            <span className="flex items-center gap-2">
              <FiMapPin />

              {contact.address||SITE.address}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementBar;
