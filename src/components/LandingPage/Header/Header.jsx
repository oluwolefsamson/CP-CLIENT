import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import CropWiseLogo from "../Logo/logo";
import OnboardingSlider from "../OnboardingSlider/OnboardingSlider";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../LanguageSwitcher"; // Adjust path if needed

// Import Skeleton from shadcn/ui
import { Skeleton } from "../../ui/skeleton";

const navlinks = [
  { path: "/", key: "trackPrices" },
  { path: "/", key: "compareProducts" },
  { path: "/", key: "contactUs" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const handleStickyHeader = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
      clearTimeout(timer);
    };
  }, []);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  if (loading) {
    return (
      <header className="header flex items-center" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            <Skeleton className="w-[120px] h-[40px] rounded-lg" />
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="w-[300px] h-[32px] rounded-lg" />
              <Skeleton className="w-[40px] h-[32px] rounded-full" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="w-[100px] h-[44px] rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full md:hidden" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="header flex items-center" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            <CropWiseLogo />

            {/* Desktop Navigation */}
            <div className="navigation hidden md:flex items-center gap-6">
              <ul className="menu flex items-center gap-[2.7rem]">
                {navlinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      {t(link.key)}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Language Switcher with shadcn Dropdown */}
              <LanguageSwitcher />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSliderOpen(true)}
                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] hover:bg-primaryColorDark transition-colors"
              >
                {t("login")}
              </button>

              {/* Hamburger icon for mobile */}
              <span className="md:hidden" onClick={toggleDrawer}>
                <BiMenu className="w-6 h-6 cursor-pointer" />
              </span>
            </div>
          </div>
        </div>

        <OnboardingSlider
          isOpen={isSliderOpen}
          onClose={() => setIsSliderOpen(false)}
        />
      </header>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[30vh] bg-white z-50 transform transition-transform duration-300 ease-in-out rounded-t-2xl shadow-lg ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        } md:hidden`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-primaryColor text-xl"
              onClick={closeDrawer}
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col items-center justify-center gap-4 mt-4">
            {navlinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primaryColor text-[16px] font-[600]"
                      : "text-textColor text-[16px] font-[500] hover:text-primaryColor"
                  }
                  onClick={closeDrawer}
                >
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
            {/* Language Switcher in drawer */}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
