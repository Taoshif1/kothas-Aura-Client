import UserDropdown from "./UserDropdown";

const DashboardNavbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-white">
      <div className="container-x flex h-20 items-center justify-between">
        <h1 className="heading text-3xl text-primary">Kotha's Aura</h1>

        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardNavbar;
