import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";

import ShopBanner from "../components/shop/ShopBanner";
import ShopSearch from "../components/shop/ShopSearch";
import ShopSort from "../components/shop/ShopSort";
import CategoryChips from "../components/shop/CategoryChips";
import ProductGrid from "../components/shop/ProductGrid";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal).then((data) => setCategories(data.categories)).catch(() => null);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts(
          { search: search || undefined, category: category || undefined, sort },
          controller.signal,
        );
        setProducts(data.products);
      } catch (requestError) {
        if (requestError.code !== "ERR_CANCELED") {
          setError(requestError.response?.data?.message || "We couldn't load the collection. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, category, sort]);

  return (
    <>
      <ShopBanner />

      <section className="section-padding">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <ShopSearch value={search} onChange={setSearch} />

            <ShopSort value={sort} onChange={setSort} />
          </div>

          <CategoryChips categories={categories} value={category} onChange={setCategory} />

          {loading && <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary" /></div>}

          {!loading && error && (
            <div className="mt-12 rounded-3xl border border-error/20 bg-error/5 p-10 text-center">
              <p className="font-semibold text-error">{error}</p>
              <button type="button" onClick={() => window.location.reload()} className="btn btn-outline mt-5 rounded-full">Try again</button>
            </div>
          )}

          {!loading && !error && <ProductGrid products={products} />}
        </div>
      </section>
    </>
  );
};

export default Shop;
