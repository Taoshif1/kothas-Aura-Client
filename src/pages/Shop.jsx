import { productData } from "../data/productData";

import ShopBanner from "../components/shop/ShopBanner";
import ShopSearch from "../components/shop/ShopSearch";
import ShopSort from "../components/shop/ShopSort";
import CategoryChips from "../components/shop/CategoryChips";
import ProductGrid from "../components/shop/ProductGrid";

const Shop = () => {
  return (
    <>
      <ShopBanner />

      <section className="section-padding">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <ShopSearch />

            <ShopSort />
          </div>

          <CategoryChips />

          <ProductGrid products={productData} />
        </div>
      </section>
    </>
  );
};

export default Shop;
