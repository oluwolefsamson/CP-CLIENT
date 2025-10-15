import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/LandingPage/Header/Header";
import Footer from "../components/LandingPage/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Hide header/footer on dashboard or admin pages
  const hiddenRoutes = ["/signup", "/admin", "/dashboard"];
  const shouldHideHeaderFooter = hiddenRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main>
        <Outlet /> {/* Nested routes render here */}
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
