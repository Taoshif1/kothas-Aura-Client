import SectionTitle from "../common/SectionTitle";
import ProductCard from "../common/ProductCard";
import { productData } from "../../data/productData";

const FeaturedProducts = () => {
  const featuredProducts = productData.filter((product) => product.featured);

  return (
    <section className="section-padding bg-base-200">
      <div className="container-x">
        <SectionTitle subtitle="Featured" title="Best Sellers" />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
