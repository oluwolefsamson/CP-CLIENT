import React from "react";
import icon01 from "../../../assets/images/icon01.png"; // Update to relevant icon for market tracking
import icon02 from "../../../assets/images/icon02.png"; // Update to relevant icon for trend analysis
import icon03 from "../../../assets/images/icon03.png"; // Update to relevant icon for price alerts
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const WhyChoose = () => {
  return (
    <section>
      <div className="container">
        <div className="lg:w-[470px] mx-auto">
          <h2 className="heading text-center">
            Real-Time Price Tracking for Smarter Agricultural Investments
          </h2>
          <p className="text__para text-center">
            AgroVest offers farmers and investors powerful tools for real-time
            price tracking, helping them make informed decisions, track market
            trends, and maximize returns on their investments in the
            agricultural sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {/* Track Market Prices */}
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img
                src={icon01}
                alt="Track Market Prices"
                className="h-[100px]"
              />
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Track Market Prices
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                Stay updated with real-time prices of agricultural products
                across different markets. Empower your investment decisions with
                the latest market data.
              </p>

              <Link
                to="/track-prices"
                className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>

          {/* Price Trend Analysis */}
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img
                src={icon02}
                alt="Price Trend Analysis"
                className="h-[100px]"
              />
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Price Trend Analysis
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                Analyze historical price trends to understand market behavior.
                Use this data to predict future price movements and make
                informed investment decisions.
              </p>

              <Link
                to="/price-trends"
                className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>

          {/* Price Alerts */}
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon03} alt="Price Alerts" className="h-[100px]" />
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Price Alerts
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                Set personalized price alerts for your agricultural products.
                Receive notifications when market prices reach your target,
                helping you optimize your investments.
              </p>

              <Link
                to="/price-alerts"
                className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
