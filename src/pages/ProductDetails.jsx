import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { getProduct } from "../api/products";
import { ROUTES } from "../constants/routes";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadProduct = async () => {
      try {
        setProduct(await getProduct(id, controller.signal));
      } catch (requestError) {
        if (requestError.code !== "ERR_CANCELED") setError(requestError.response?.data?.message || "We couldn't load this product.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadProduct();
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;
  if (error) return <section className="container-x min-h-[70vh] pt-40 text-center"><h1 className="heading text-5xl">Product unavailable</h1><p className="mt-5 text-neutral/70">{error}</p><Link to={ROUTES.SHOP} className="btn btn-primary mt-8 rounded-full px-8">Back to Shop</Link></section>;

  const image = product.images?.[0];
  return (
    <>
      <Helmet><title>{product.name} | Kotha's Aura</title><meta name="description" content={product.description} /></Helmet>
      <section className="pb-20 pt-36">
        <div className="container-x">
          <div className="mb-8 text-sm text-neutral/60"><Link to={ROUTES.SHOP} className="hover:text-primary">Shop</Link><span className="mx-3">/</span>{product.name}</div>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="overflow-hidden rounded-[40px] bg-base-200">
              {image ? <img src={image} alt={product.name} className="h-[560px] w-full object-cover" /> : <div className="flex h-[560px] items-center justify-center text-neutral/40">Image coming soon</div>}
            </div>
            <div className="lg:py-8">
              <p className="uppercase tracking-[4px] text-primary">{product.category}{product.subcategory && ` · ${product.subcategory}`}</p>
              <h1 className="heading mt-4 text-5xl lg:text-6xl">{product.name}</h1>
              <div className="mt-6 flex items-center gap-3 text-warning"><div className="flex">{[...Array(Math.round(product.rating || 0))].map((_, index) => <FiStar key={index} className="fill-current" />)}</div><span className="text-sm text-neutral/60">{product.rating || 0} ({product.reviewCount || 0} reviews)</span></div>
              <div className="mt-8 flex items-baseline gap-4"><p className="text-3xl font-bold text-primary">৳ {product.price}</p>{product.compareAtPrice > product.price && <p className="text-xl text-neutral/40 line-through">৳ {product.compareAtPrice}</p>}</div>
              <p className="mt-8 leading-8 text-neutral/75">{product.description}</p>
              <div className="mt-10 grid gap-4 rounded-3xl border border-base-300 bg-base-100 p-6 sm:grid-cols-2"><p><span className="font-semibold">SKU:</span> {product.sku}</p><p><span className="font-semibold">Availability:</span> <span className={product.stock > 0 ? "text-success" : "text-error"}>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span></p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
