import React from "react";
import { Link } from "react-router-dom";
import featureImg from "../../../assets/images/feature-img.jpg";
import videoIcon from "../../../assets/images/video-icon.png";
import avatarIcon from "../../../assets/images/avatar-icon.jpg";

const Feature = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          {/* Feature content */}
          <div className="xl:w-[670px]">
            <h2 className="heading">
              Track Your Investments <br /> Securely & Profitably.
            </h2>
            <ul className="pl-4">
              <li className="text__para">
                1. Track real-time commodity prices and market fluctuations.
              </li>
              <li className="text__para">
                2. Access insightful analytics to make informed investment
                decisions.
              </li>
              <li className="text__para">
                3. Monitor your portfolio with up-to-date tracking features.
              </li>
            </ul>
            <Link to="/track-investment">
              <button className="btn">Learn More</button>
            </Link>
          </div>

          {/* Feature image */}
          <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
            <img
              src={featureImg}
              className="w-3/4 rounded-xl"
              alt="Price Tracking"
            />

            <div className="w-[150px] lg:w-[240px] bg-gray-200 absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] lg:gap-3">
                  <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                    Today
                  </p>
                  <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                    Live Price Tracking
                  </p>
                </div>
                <span className="w-5 h-5 lg:w-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                  <img src={videoIcon} alt="Video Icon" />
                </span>
              </div>

              <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[9px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                Verified Supplier
              </div>

              <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px] ">
                <img
                  src={avatarIcon}
                  alt="Supplier Avatar"
                  className="h-[50px] rounded-full"
                />
                <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                  Agrovest Verified Trader
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
