import { Link } from "react-router-dom";
import { categoryData } from "../../data/categoryData";
import SectionTitle from "../common/SectionTitle";

const Categories = () => {
  return (
    <section className="section-padding">
      <div className="container-x">
        <SectionTitle subtitle="Collections" title="Shop By Category" />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {categoryData.map((category) => (
            <Link
              key={category.id}
              className="group overflow-hidden rounded-3xl"
            >
              <div className="relative h-[420px]">
                <img
                  src={category.image}
                  className="h-full w-full object-cover duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-8 left-8">
                  <h3 className="heading text-3xl text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
