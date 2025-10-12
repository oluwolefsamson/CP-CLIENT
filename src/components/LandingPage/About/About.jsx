
import aboutImg from "../../../assets/images/about.jpg";

import { Link } from "react-router-dom";
import videoIcon from "../../../assets/images/video-icon.png";
import avatarIcon from "../../../assets/images/avatar-icon.jpg";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative z-10 xl:w-[750px]  flex justify-start mt-[50px] lg:mt-0">
            <img
              src={aboutImg}
              className="w-3/4 rounded"
              alt="Agrovest platform" // Update alt to "Agri Price Tracker Platform"
            />

            <div className="w-[150px] lg:w-[240px] bg-gray-200 absolute bottom-[50px] right-0 md:bottom-[100px] md:right-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] lg:gap-3">
                  <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                    Today
                  </p>
                  <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                    Live Price Updates
                  </p>
                </div>
                <span className="w-5 h-5 lg:w-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                  <img src={videoIcon} alt="" />
                </span>
              </div>

              <div className="w-[65px] lg:w-[56px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[9px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                Verified
              </div>

              <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                <img
                  src={avatarIcon}
                  alt=""
                  className="h-[50px] rounded-full"
                />
                <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                  AgriMarket Analyst
                </h4>
              </div>
            </div>
          </div>

          {/* about content */}
          <div className="w-full lg:w-1/2 xl:w[670px] order-1 lg:order-2">
            <h2 className="heading">
              Empowering Farmers through Real-Time Price Data
            </h2>
            <p className="text__para">
              Our platform provides up-to-date market prices for crops across
              regions, helping farmers make informed selling decisions and
              optimize profits. We are dedicated to closing the information gap
              in agricultural trade.
            </p>
            <p className="text__para mt-4">
              With real-time price analytics, historical trends, and future
              forecasts, we empower both producers and buyers to make smarter
              moves in the agri market. Join us in revolutionizing how
              agricultural pricing is accessed and utilized.
            </p>

            <Link to="/about">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; // Rename to AboutPriceTracker
