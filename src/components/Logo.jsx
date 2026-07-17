import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <img
        src={logo}
        alt="Kotha's Aura"
        className="w-12"
      />

      <div>

        <h2 className="heading text-2xl">
          Kotha's Aura
        </h2>

        <p className="text-xs uppercase tracking-[4px] opacity-60">
          Beauty & Lifestyle
        </p>

      </div>

    </Link>
  );
};

export default Logo;