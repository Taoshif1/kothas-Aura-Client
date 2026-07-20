import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-cover duration-700 group-hover:scale-110"
        />

        {product.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase text-white">
            New
          </span>
        )}

        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-primary hover:text-white">
          <FiHeart />
        </button>
      </div>

      {/* Content */}

      <div className="space-y-4 p-6">
        <p className="text-sm uppercase tracking-wider text-primary">
          {product.category}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="heading block text-2xl transition hover:text-primary"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-warning">
          {[...Array(Math.round(product.rating))].map((_, index) => (
            <FiStar key={index} className="fill-current" />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">৳ {product.price}</p>

          <button className="btn btn-primary btn-circle">
            <FiShoppingBag />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
