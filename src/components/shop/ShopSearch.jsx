import { FiSearch } from "react-icons/fi";

const ShopSearch = () => {
  return (
    <div className="relative w-full lg:max-w-md">
      <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-lg opacity-50" />

      <input
        type="text"
        placeholder="Search products..."
        className="input h-14 w-full rounded-full border-base-300 bg-base-100 pl-14 shadow-sm focus:border-primary"
      />
    </div>
  );
};

export default ShopSearch;
