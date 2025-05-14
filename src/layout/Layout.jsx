import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/LandingPage/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../components/LandingPage/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Paths where Header and Footer should be hidden
  const hiddenRoutes = ["/signup", "/admin", "/dashboard"];

  const shouldHideHeaderFooter = hiddenRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main>
        <Routers />
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
