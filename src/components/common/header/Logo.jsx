import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { SITE } from "../../../constants/site";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 hover:opacity-90 transition-default"
    >
      <img
        src={logo}
        alt={SITE.name}
        className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
      />

      <div>
        <h1 className="heading text-2xl lg:text-3xl leading-none">
          {SITE.name}
        </h1>

        <p className="text-[11px] uppercase tracking-[5px] opacity-60">
          {SITE.tagline}
        </p>
      </div>
    </Link>
  );
};

export default Logo;
