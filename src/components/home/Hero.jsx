import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useHero } from "../../hooks/useHero";

const Hero = () => {
  const slides = useHero();
  const hero = slides[0];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}

      <img
        src={hero.image}
        alt={hero.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 " />

      {/* Content */}

      <div className="container-x relative flex h-full items-center pt-32 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-2xl text-white"
        >
          <p className="mb-4 uppercase tracking-[5px] text-rose-200">
            {hero.eyebrow}
          </p>

          <h1 className="heading mb-6 text-6xl lg:text-8xl">{hero.title}</h1>

          <p className="mb-10 max-w-xl text-lg leading-8 text-white/90">
            {hero.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to={hero.primaryButton.link}
              className="btn btn-primary rounded-full px-10"
            >
              {hero.primaryButton.text}
            </Link>

            <Link
              to={hero.secondaryButton.link}
              className="btn rounded-full border-white bg-transparent px-10 text-white hover:bg-white hover:text-black"
            >
              {hero.secondaryButton.text}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
