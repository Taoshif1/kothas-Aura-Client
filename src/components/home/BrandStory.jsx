import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="section-padding">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
              alt=""
              className="rounded-[40px] object-cover shadow-xl"
            />
          </div>

          <div>
            <p className="mb-3 uppercase tracking-[5px] text-primary">
              Our Story
            </p>

            <h2 className="heading mb-6 text-5xl">Beauty is confidence.</h2>

            <p className="mb-6 leading-8 text-neutral/80">
              Kotha's Aura brings carefully selected beauty, skincare and
              lifestyle products that make women feel confident every day.
            </p>

            <p className="mb-10 leading-8 text-neutral/80">
              We focus on authenticity, premium quality and beautiful
              presentation.
            </p>

            <Link to="/about" className="btn btn-primary rounded-full px-10">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
