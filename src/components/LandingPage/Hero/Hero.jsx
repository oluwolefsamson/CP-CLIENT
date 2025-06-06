"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import hero1 from "../../../assets/images/HeroImg/hero1.jpg";
import hero2 from "../../../assets/images/HeroImg/hero2.jpg";
import hero3 from "../../../assets/images/HeroImg/hero3.jpg";
import hero4 from "../../../assets/images/HeroImg/hero4.jpg";
import hero5 from "../../../assets/images/HeroImg/hero5.jpg";

import { AvatarCirclesDemo } from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { LineShadowText } from "../../LandingPage/magicui/line-shadow-text";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero__section pt-[60px] 2xl:h-[800px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
          <div>
            <div className="lg:w-[570px]">
              <h1 className="text-4xl font-bold text-gray-800 leading-[3rem] sm:text-5xl lg:text-6xl">
                <p>{t("hero.title.line1")}</p>
                <p>{t("hero.title.line2")}</p>
              </h1>

              <p className="text__para">{t("hero.subtitle")}</p>

              <div className="flex gap-3 items-center">
                <Link to="/track-prices">
                  <button className="hero_btn1">{t("trackPrices")}</button>
                </Link>
                <Link to="/about">
                  <button className="hero_btn2">
                    {t("hero.buttons.learnMore")}
                  </button>
                </Link>
              </div>

              <div className="pt-[30px]">
                <AvatarCirclesDemo />
              </div>
            </div>

            {/* Hero counter */}
            <div className="mt-[30px] lg:mt-[20px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
              <div className="flex flex-col gap-2">
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  10,000+
                </h2>
                <span className="w-[150px] h-2 bg-yellow-500 rounded-full block mt-[-14px]"></span>
                <p className="text__para">Products Tracked</p>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  $5M+
                </h2>
                <span className="w-[150px] h-2 bg-green-500 rounded-full block mt-[-14px]"></span>
                <p className="text__para">Savings for Users</p>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  100+
                </h2>
                <span className="w-[100px] h-2 bg-primaryColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">Price Comparison</p>
              </div>
            </div>
          </div>

          {/* Hero images */}
          <div className="relative flex gap-[20px] h-[400px] lg:h-[700px] justify-center items-center px-8">
            <div className="relative z-10">
              <img src={hero1} alt="price image 1" className="w-full rounded" />
            </div>
            <div className="relative z-10 mt-[30px]">
              <img src={hero2} alt="price image 2" className="w-full rounded" />
              <img
                src={hero3}
                alt="price image 3"
                className="w-full my-[30px] rounded"
              />
              <img src={hero4} alt="price image 4" className="w-full rounded" />
            </div>
            <div className="relative z-10">
              <img src={hero5} alt="price image 5" className="w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
