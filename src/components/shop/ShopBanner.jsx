import { Link } from "react-router-dom";

const ShopBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-36 pb-20">
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container-x relative">
        <p className="mb-3 uppercase tracking-[6px] text-primary">
          Premium Collection
        </p>

        <h1 className="heading text-5xl lg:text-7xl">Shop</h1>

        <div className="mt-5 flex items-center gap-3 text-sm opacity-70">
          <Link to="/">Home</Link>

          <span>/</span>

          <span>Shop</span>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
