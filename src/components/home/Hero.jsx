import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useHero } from "../../hooks/useHero";
import useStoreSettings from "../../hooks/useStoreSettings";

// Simple typewriter hook — types out text char by char
const useTypewriter = (text, speed = 60, startDelay = 600) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let interval;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return displayed;
};

const Hero = () => {
  const slides = useHero();
  const{settings}=useStoreSettings();const configured=settings.storefront?.hero;const fallback=slides[0];
  const hero=configured?.enabled?{image:configured.image||fallback.image,eyebrow:configured.eyebrow||fallback.eyebrow,title:configured.title||fallback.title,description:configured.description||fallback.description,primaryButton:{text:configured.primaryButtonText||fallback.primaryButton.text,link:configured.primaryButtonLink||fallback.primaryButton.link},secondaryButton:{text:configured.secondaryButtonText||fallback.secondaryButton.text,link:configured.secondaryButtonLink||fallback.secondaryButton.link}}:fallback;
  const typedTitle = useTypewriter(hero.title, 55, 500);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}

      <img
        src={hero.image}
        alt={hero.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay — dark on left where text sits, fades out on right */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#3F2E33]/85 via-[#3F2E33]/55 to-[#3F2E33]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3F2E33]/70 via-transparent to-[#3F2E33]/20" />

      {/* Soft blurred glow blobs — minimal ambient decoration */}

      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[#E8B7C0]/30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/3 bottom-10 h-96 w-96 rounded-full bg-[#D98C9A]/20 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}

      <div className="container-x relative flex h-full items-center pt-32 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          {/* Frosted glass panel behind the text */}

          <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-md border border-white/10 shadow-2xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 uppercase tracking-[5px] text-[#F3D9C4] font-semibold drop-shadow-md"
            >
              {hero.eyebrow}
            </motion.p>

            <h1 className="heading mb-6 text-6xl lg:text-8xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] min-h-[1.2em] lg:min-h-[2.2em]">
              {typedTitle}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block w-[3px] lg:w-[5px] h-[0.85em] bg-[#F3D9C4] ml-1 align-middle"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-10 max-w-xl text-lg leading-8 text-white/95 drop-shadow-md"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to={hero.primaryButton.link}
                className="btn btn-primary rounded-full px-10 shadow-lg shadow-black/20"
              >
                {hero.primaryButton.text}
              </Link>

              <Link
                to={hero.secondaryButton.link}
                className="btn rounded-full border-2 border-[#3F2E33] bg-white/90 text-[#3F2E33] px-10 hover:bg-[#3F2E33] hover:text-white hover:border-[#3F2E33] transition-default"
              >
                {hero.secondaryButton.text}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
