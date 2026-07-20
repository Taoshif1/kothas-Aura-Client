import { Outlet } from "react-router-dom";

import Footer from "../components/common/footer/Footer";
import Navbar from "../components/common/header/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
