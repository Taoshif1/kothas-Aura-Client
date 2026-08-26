const ShopSort = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="select h-14 rounded-full border-base-300 bg-base-100 shadow-sm">
      <option value="newest">Newest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="popularity">Popularity</option>
    </select>
  );
};

export default ShopSort;
