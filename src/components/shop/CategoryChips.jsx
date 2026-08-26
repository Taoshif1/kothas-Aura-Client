const CategoryChips = ({ categories, value, onChange }) => {
  return (
    <div className="mt-12 flex flex-wrap gap-4">
      {["All", ...categories.map((item) => item.name)].map((category) => (
        <button
          type="button"
          key={category}
          onClick={() => onChange(category === "All" ? "" : category)}
          className={`btn rounded-full px-7 ${
            (category === "All" && !value) || category === value ? "btn-primary" : "btn-outline border-base-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
