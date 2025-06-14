import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import CropWiseLogo from "../Logo/logo";

import { Skeleton } from "../../ui/skeleton";

const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5 " />,
  },
  {
    path: "https://github.com/price-tracker",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.instagram.com/price-tracker",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.linkedin.com/company/price-tracker",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about-us",
    display: "About Price Tracker",
  },
  {
    path: "/features",
    display: "Key Features",
  },
  {
    path: "/blog",
    display: "Market Insights",
  },
];

const quickLinks02 = [
  {
    path: "/track-prices",
    display: "Track Prices",
  },
  {
    path: "/compare-products",
    display: "Compare Products",
  },
  {
    path: "/price-alerts",
    display: "Set Price Alerts",
  },
  {
    path: "/pricing",
    display: "Pricing Plans",
  },
];

const quickLinks03 = [
  {
    path: "/contact",
    display: "Contact Us",
  },
  {
    path: "/support",
    display: "Support & FAQs",
  },
];

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const year = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <footer className="pb-16 pt-10">
        <div className="container">
          <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
            <div>
              <Skeleton className="w-[120px] h-[40px] rounded-lg mb-4" />
              <Skeleton className="w-[220px] h-[20px] rounded mb-2" />
              <div className="flex items-center gap-3 mt-4">
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
                <Skeleton className="w-9 h-9 rounded-full" />
              </div>
            </div>
            <div>
              <Skeleton className="w-[120px] h-[28px] rounded mb-4" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
            </div>
            <div>
              <Skeleton className="w-[120px] h-[28px] rounded mb-4" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
            </div>
            <div>
              <Skeleton className="w-[120px] h-[28px] rounded mb-4" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
              <Skeleton className="w-[120px] h-[20px] rounded mb-2" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <CropWiseLogo />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright © {year} Price Tracker. Empowering your price tracking
              needs. All rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.icon.type.name} page`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
