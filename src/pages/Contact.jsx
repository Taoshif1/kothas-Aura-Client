import { SITE } from "../constants/site";

const Contact = () => {
  return (
    <section className="pt-28 pb-20">
      <div className="container-x max-w-4xl">
        <p className="uppercase tracking-[4px] text-primary">Contact</p>

        <h1 className="heading mt-2 text-5xl">We'd Love To Hear From You</h1>

        <div className="mt-16 grid gap-8 rounded-3xl border border-base-300 bg-base-100 p-10 lg:grid-cols-2">
          <div>
            <h2 className="heading text-2xl">Contact Information</h2>

            <div className="mt-8 space-y-4">
              <p>{SITE.phone}</p>
              <p>{SITE.email}</p>
              <p>{SITE.address}</p>
            </div>
          </div>

          <div>
            <h2 className="heading text-2xl">Business Hours</h2>

            <div className="mt-8 space-y-3">
              <p>Sunday - Thursday</p>
              <p>10:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
