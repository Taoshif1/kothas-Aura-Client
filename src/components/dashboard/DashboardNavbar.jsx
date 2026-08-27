import{Link}from"react-router-dom";import{FiHome}from"react-icons/fi";import UserDropdown from "./UserDropdown";

const DashboardNavbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-white">
      <div className="container-x flex h-20 items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-5"><Link to="/" className="heading text-2xl text-primary sm:text-3xl">Kotha&apos;s Aura</Link><Link to="/" className="btn btn-ghost btn-sm gap-2"><FiHome/><span className="hidden sm:inline">Back to Store</span></Link></div>

        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardNavbar;
