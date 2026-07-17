const SectionTitle = ({
  title,
  subtitle,
}) => {
  return (
    <div className="text-center">

      <p className="text-primary uppercase tracking-[4px] mb-2">

        {subtitle}

      </p>

      <h2 className="heading text-5xl">

        {title}

      </h2>

    </div>
  );
};

export default SectionTitle;