import { Link } from "react-router-dom";
const DashboardCard = ({ title, value, to, action }) => {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <p className="text-neutral/60">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-primary">{value}</h2>
      {to && <Link className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline" to={to}>{action}</Link>}
    </div>
  );
};

export default DashboardCard;
