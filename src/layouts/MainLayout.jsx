import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Footer from "../components/common/footer/Footer";
import Navbar from "../components/common/header/Navbar";
import useStoreSettings from "../hooks/useStoreSettings";

const MainLayout = () => {
  const{pathname}=useLocation();const{settings}=useStoreSettings();const titles={"/":"Home","/shop":"Shop","/about":"About","/contact":"Contact","/track-order":"Track Order","/checkout":"Checkout"};const label=pathname.startsWith("/product/")?"Product":pathname.startsWith("/order-success/")?"Order Confirmed":titles[pathname];const noindex=pathname==="/checkout"||pathname.startsWith("/order-success/");
  return (
    <>
      <Helmet><title>{label?`${label} | ${settings.seo?.defaultTitle||settings.storeName}`:settings.seo?.defaultTitle||settings.storeName}</title><meta name="description" content={settings.seo?.defaultDescription}/>{noindex&&<meta name="robots" content="noindex,nofollow"/>}</Helmet>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
