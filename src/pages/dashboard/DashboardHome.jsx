import DashboardCard from "../../components/dashboard/DashboardCard";

const DashboardHome = () => {
  return (
    <section>
      <h1 className="heading text-5xl">Welcome Back</h1>

      <p className="mt-3 text-neutral/70">Manage your account and orders.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Orders" value="0" />

        <DashboardCard title="Wishlist" value="0" />

        <DashboardCard title="Cart" value="0" />

        <DashboardCard title="Reward Points" value="0" />
      </div>
    </section>
  );
};

export default DashboardHome;
