import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const ProductCard = ({ product }) => {
  const id = product._id || product.id;
  const name = product.name || product.title;
  const image = product.images?.[0] || product.image;
  const hasVariants = Boolean(product.variants?.length);
  const availableStock = hasVariants ? product.variants.filter((variant) => variant.active).reduce((sum, variant) => sum + variant.stock, 0) : product.stock;
  const { addItem } = useCart();
  const { contains, toggle } = useWishlist();
  const wished = contains(id);
  const handleCart = async () => { if (hasVariants) { toast("Choose your options on the product page"); return; } try { await addItem(product); toast.success("Added to cart"); } catch (error) { toast.error(error.response?.data?.message || error.message); } };
  const handleWishlist = async () => { try { await toggle(product); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); } catch (error) { toast.error(error.response?.data?.message || error.message); } };

  return (
    <article className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-80 w-full object-cover duration-700 group-hover:scale-110"
        />

        {product.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase text-white">
            New
          </span>
        )}

        <button aria-label="Toggle wishlist" onClick={handleWishlist} className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-md transition ${wished ? "bg-primary text-white" : "bg-white hover:bg-primary hover:text-white"}`}>
          <FiHeart />
        </button>
      </div>

      {/* Content */}

      <div className="space-y-4 p-6">
        <p className="text-sm uppercase tracking-wider text-primary">
          {product.category}
        </p>

        <Link
          to={`/product/${id}`}
          className="heading block text-2xl transition hover:text-primary"
        >
          {name}
        </Link>

        <div className="flex items-center gap-1 text-warning">
          {[...Array(Math.round(product.rating || 0))].map((_, index) => (
            <FiStar key={index} className="fill-current" />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">৳ {product.price}</p>

          <button aria-label={hasVariants ? "Choose product options" : "Add to cart"} disabled={!availableStock} onClick={handleCart} className="btn btn-primary btn-circle">
            <FiShoppingBag />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
