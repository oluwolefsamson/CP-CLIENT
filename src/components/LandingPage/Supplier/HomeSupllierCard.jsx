import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa"; // Using FaStar from react-icons for star ratings
import starIcon from "../../../assets/images/Star.png"; // Optional if you prefer an image-based star

const HomeSupplierCard = ({ supplier }) => {
  const {
    id,
    name,
    location,
    avgPricePerTon,
    priceTrend,
    photo,
    cropsAvailable,
    marketInsights,
    avgRating,
    totalReviews,
  } = supplier;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Supplier Image */}
      <div className="relative mb-4">
        <img
          src={photo}
          className="w-full h-[220px] object-cover rounded-lg"
          alt={name}
        />
      </div>

      {/* Supplier Name & Location */}
      <h2 className="text-2xl font-semibold text-gray-800 hover:text-skyblue transition-all duration-300">
        {name}
      </h2>
      <p className="text-sm text-gray-600 mt-2">{location}</p>

      {/* Rating */}
      <div className="flex items-center mt-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-lg ${index < avgRating ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">
          ({totalReviews} reviews)
        </span>
      </div>

      {/* Price Trend */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Price per Ton: <span className="text-skyblue">${avgPricePerTon}</span>
        </h3>
        <p className="text-sm text-gray-600">
          Current price trend:{" "}
          <span className="font-semibold">{priceTrend.trend}</span> (
          {priceTrend.percentageChange})
        </p>
        <p className="text-xs text-gray-500">
          Predicted price: ${priceTrend.predicted} next month
        </p>
      </div>

      {/* Crops Available */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-800">
          Crops Available:
        </h4>
        {cropsAvailable.map((crop) => (
          <div key={crop.crop} className="flex justify-between mt-2">
            <span className="text-gray-600">{crop.crop}</span>
            <span className="text-gray-800 font-semibold">
              {crop.available}
            </span>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-800">
          Market Insights:
        </h4>
        <p className="text-sm text-gray-600">{marketInsights.demand}</p>
        <p className="text-sm text-gray-600">{marketInsights.forecast}</p>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between mt-6">
        <Link
          to={`/suppliers/${id}`}
          className="w-12 h-12 flex items-center bg-green-500 justify-center rounded-full bg-skyblue text-white hover:bg-green-800 transition-all duration-300"
        >
          <BsArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default HomeSupplierCard;
