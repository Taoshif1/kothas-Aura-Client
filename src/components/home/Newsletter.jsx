const Newsletter = () => {
  return (
    <section className="section-padding">
      <div className="container-x">
        <div className="rounded-[40px] bg-primary p-16 text-center text-white">
          <p className="uppercase tracking-[4px]">Stay Updated</p>

          <h2 className="heading mt-3 text-5xl">Join Our Community</h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/90">
            Receive exclusive offers, beauty tips and first access to new
            arrivals.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full rounded-l-full border-none"
            />

            <button className="btn rounded-r-full bg-secondary text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
