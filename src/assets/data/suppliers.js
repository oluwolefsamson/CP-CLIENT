import supplierImg01 from "../images/supplier-img01.jpg";
import supplierImg02 from "../images/supplier-img02.jpg";
import supplierImg03 from "../images/supplier-img03.jpg";

// Data structure aligned with price tracking
export const suppliers = [
  {
    id: "01",
    name: "GreenFields Agriculture Ltd.",
    location: "Kenya",
    avgPricePerTon: 1500, // Price per ton of crops
    priceTrend: {
      current: 1500,
      lastMonth: 1400, // Last month's price
      lastQuarter: 1300, // Price from 3 months ago
      trend: "Upward", // Trend direction
      percentageChange: "7.14%", // Percentage change compared to last month
      predicted: "1600", // Predicted price for next month
    },
    photo: supplierImg01,
    cropsAvailable: [
      {
        crop: "Maize",
        available: "8,000+ tons",
        price: 1500, // Price per ton for maize
        priceTrend: "Upward trend due to increased demand",
      },
      {
        crop: "Organic Tomatoes",
        available: "3,000+ tons",
        price: 1800, // Price per ton for organic tomatoes
        priceTrend: "Stable, with slight seasonal fluctuations",
      },
    ],
    marketInsights: {
      demand: "Increasing demand for organic crops, particularly tomatoes.",
      supply: "High supply levels expected due to good weather conditions.",
      forecast: "Prices expected to rise by 7-10% over the next quarter.",
    },
    about:
      "GreenFields Agriculture Ltd. specializes in organic farming, providing high-quality maize and tomatoes. Their price tracking system updates in real-time, helping farmers and buyers stay informed about market shifts and trends.",
  },
  {
    id: "02",
    name: "Farm Fresh Ghana",
    location: "Ghana",
    avgPricePerTon: 1300,
    priceTrend: {
      current: 1300,
      lastMonth: 1250,
      lastQuarter: 1200,
      trend: "Moderate Fluctuations",
      percentageChange: "4.00%",
      predicted: "1350",
    },
    photo: supplierImg02,
    cropsAvailable: [
      {
        crop: "Mangoes",
        available: "5,000+ tons",
        price: 1400,
        priceTrend: "Fluctuating, influenced by seasonal supply",
      },
      {
        crop: "Lettuce",
        available: "2,000+ tons",
        price: 1100,
        priceTrend: "Stable with minor fluctuations",
      },
    ],
    marketInsights: {
      demand: "Growing demand for mangoes due to export requirements.",
      supply:
        "Supply is moderate, with seasonal fluctuations in lettuce prices.",
      forecast:
        "Mango prices expected to increase by 5% over the next quarter due to export demand.",
    },
    about:
      "Farm Fresh Ghana provides fresh, high-quality mangoes, lettuce, and other vegetables. The price tracking platform allows buyers and farmers to follow price trends and adjust purchasing or production strategies accordingly.",
  },
  {
    id: "03",
    name: "Cocoa Pride Farms",
    location: "Ivory Coast",
    avgPricePerTon: 2500,
    priceTrend: {
      current: 2500,
      lastMonth: 2400,
      lastQuarter: 2350,
      trend: "Stable with minor fluctuations",
      percentageChange: "4.17%",
      predicted: "2450",
    },
    photo: supplierImg03,
    cropsAvailable: [
      {
        crop: "Cocoa Beans",
        available: "10,000+ tons",
        price: 2500,
        priceTrend: "Stable with slight seasonal decreases",
      },
    ],
    marketInsights: {
      demand: "Steady demand for premium cocoa globally.",
      supply:
        "Expected moderate fluctuations in supply due to seasonal conditions.",
      forecast:
        "Stable prices, with slight decreases expected during the off-season.",
    },
    about:
      "Cocoa Pride Farms focuses on producing premium cocoa beans with sustainable farming practices. Their price tracking system helps buyers monitor the cocoa market and anticipate pricing changes, ensuring informed trade decisions.",
  },
];
