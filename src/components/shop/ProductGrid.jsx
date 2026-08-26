import ProductCard from "../common/ProductCard";

const ProductGrid = ({ products }) => {
  if (!products.length) {
    return <p className="mt-16 rounded-3xl border border-base-300 bg-base-100 p-12 text-center text-neutral/70">No products match your current search or filters.</p>;
  }

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
