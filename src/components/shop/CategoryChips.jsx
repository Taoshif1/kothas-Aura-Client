const categories = ["All", "Beauty", "Jewelry", "Lifestyle"];

const CategoryChips = () => {
  return (
    <div className="mt-12 flex flex-wrap gap-4">
      {categories.map((category, index) => (
        <button
          key={category}
          className={`btn rounded-full px-7 ${
            index === 0 ? "btn-primary" : "btn-outline border-base-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
