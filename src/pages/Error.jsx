import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="heading text-8xl">
          404
        </h1>

        <p className="my-5">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="btn btn-primary rounded-full px-8"
        >
          Back Home
        </Link>

      </div>

    </section>
  );
};

export default Error;