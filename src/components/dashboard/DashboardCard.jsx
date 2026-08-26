const DashboardCard = ({ title, value }) => {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <p className="text-neutral/60">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-primary">{value}</h2>
    </div>
  );
};

export default DashboardCard;
