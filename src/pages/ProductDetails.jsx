import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiMinus, FiPlus, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import { getProduct } from "../api/products";
import { ROUTES } from "../constants/routes";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { const controller = new AbortController(); getProduct(id, controller.signal).then(setProduct).catch((requestError) => { if (requestError.code !== "ERR_CANCELED") setError(requestError.response?.data?.message || "We couldn't load this product."); }).finally(() => { if (!controller.signal.aborted) setLoading(false); }); return () => controller.abort(); }, [id]);
  const variants = useMemo(() => product?.variants || [], [product]);
  const optionNames = useMemo(() => [...new Set(variants.flatMap((variant) => Object.keys(variant.attributes || {})))], [variants]);
  const selectedVariant = variants.find((variant) => optionNames.every((name) => selections[name] === variant.attributes[name]));
  const hasVariants = variants.length > 0;
  const current = selectedVariant || product;
  const stock = hasVariants ? (selectedVariant?.active ? selectedVariant.stock : 0) : product?.stock || 0;
  const choose = (name, value) => { setSelections((currentSelections) => ({ ...currentSelections, [name]: value })); setQuantity(1); };
  const optionAvailable = (name, value) => variants.some((variant) => variant.active && variant.stock > 0 && variant.attributes[name] === value && Object.entries(selections).every(([selectedName, selectedValue]) => selectedName === name || !selectedValue || variant.attributes[selectedName] === selectedValue));
  const add = async () => { if (hasVariants && !selectedVariant) return toast.error("Choose all product options"); try { await addItem(product, selectedVariant, quantity); toast.success("Added to cart"); } catch (requestError) { toast.error(requestError.response?.data?.message || requestError.message); } };

  if (loading) return <div className="flex min-h-screen items-center justify-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;
  if (error) return <section className="container-x min-h-[70vh] pt-40 text-center"><h1 className="heading text-5xl">Product unavailable</h1><p className="mt-5 text-neutral/70">{error}</p><Link to={ROUTES.SHOP} className="btn btn-primary mt-8 rounded-full">Back to Shop</Link></section>;
  return <><Helmet><title>{product.name} | Kotha's Aura</title><meta name="description" content={product.description} /></Helmet><section className="pb-20 pt-36"><div className="container-x"><div className="mb-8 text-sm text-neutral/60"><Link to={ROUTES.SHOP}>Shop</Link><span className="mx-3">/</span>{product.name}</div><div className="grid gap-12 lg:grid-cols-2"><div><div className="overflow-hidden rounded-[40px] bg-base-200">{product.images?.[imageIndex] ? <img src={product.images[imageIndex]} alt={product.name} className="h-[560px] w-full object-cover" /> : <div className="flex h-[560px] items-center justify-center">Image coming soon</div>}</div><div className="mt-4 flex gap-3 overflow-x-auto">{product.images?.map((image, index) => <button key={image} onClick={() => setImageIndex(index)} className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${index === imageIndex ? "border-primary" : "border-transparent"}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div></div><div className="lg:py-5"><p className="uppercase tracking-[4px] text-primary">{product.brand || product.category}</p><h1 className="heading mt-4 text-5xl">{product.name}</h1><p className="mt-2 text-neutral/60">{product.category}{product.subcategory && ` · ${product.subcategory}`}</p><div className="mt-5 flex items-center gap-3 text-warning"><FiStar className="fill-current" /> {product.rating || 0} <span className="text-neutral/50">({product.reviewCount || 0} reviews)</span></div><div className="mt-7 flex items-baseline gap-4"><strong className="text-3xl text-primary">৳ {current?.price}</strong>{current?.compareAtPrice > current?.price && <span className="text-xl text-neutral/40 line-through">৳ {current.compareAtPrice}</span>}</div><p className="mt-7 leading-8 text-neutral/70">{product.description}</p>{optionNames.map((name) => <div key={name} className="mt-7"><p className="mb-3 font-semibold">{name}</p><div className="flex flex-wrap gap-2">{[...new Set(variants.map((variant) => variant.attributes[name]).filter(Boolean))].map((value) => <button key={value} disabled={!optionAvailable(name, value)} onClick={() => choose(name, value)} className={`btn btn-sm rounded-full ${selections[name] === value ? "btn-primary" : "btn-outline"}`}>{value}</button>)}</div></div>)}<div className="mt-8 rounded-3xl border border-base-300 p-5"><p>SKU: <strong>{current?.sku || "Choose options"}</strong></p><p className={stock ? "text-success" : "text-error"}>{stock ? `${stock} available` : "Out of stock"}</p></div>{Object.keys(product.specifications || {}).length > 0 && <div className="mt-7"><h2 className="heading text-2xl">Specifications</h2><dl className="mt-3 grid grid-cols-2 gap-3">{Object.entries(product.specifications).map(([key, value]) => <div key={key}><dt className="text-sm text-neutral/50">{key}</dt><dd>{value}</dd></div>)}</dl></div>}<div className="mt-8 flex flex-wrap gap-3"><div className="join"><button disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)} className="btn join-item"><FiMinus /></button><span className="btn join-item pointer-events-none">{quantity}</span><button disabled={quantity >= stock} onClick={() => setQuantity(quantity + 1)} className="btn join-item"><FiPlus /></button></div><button disabled={!stock || (hasVariants && !selectedVariant)} onClick={add} className="btn btn-primary flex-1 rounded-full">Add to Cart</button><button onClick={() => wishlist.toggle(product)} className={`btn btn-circle ${wishlist.contains(product._id) ? "btn-primary" : "btn-outline"}`}><FiHeart /></button><button disabled className="btn w-full rounded-full">Buy Now — Phase 4</button></div></div></div></div></section></>;
};
export default ProductDetails;
