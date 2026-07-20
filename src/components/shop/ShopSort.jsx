const ShopSort = () => {
  return (
    <select className="select h-14 rounded-full border-base-300 bg-base-100 shadow-sm">
      <option>Newest</option>
      <option>Price : Low to High</option>
      <option>Price : High to Low</option>
      <option>Popularity</option>
    </select>
  );
};

export default ShopSort;
