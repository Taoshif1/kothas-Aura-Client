import ProductCard from "../common/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
