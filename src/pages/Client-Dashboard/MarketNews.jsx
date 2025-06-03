import React, { useState, useEffect } from "react";
import coffeePlantation from "../../assets/images/MarketNewsImg/coffee-plantation.jpg";
import wheatField from "../../assets/images/MarketNewsImg/wheat-field.jpg";
import grain from "../../assets/images/MarketNewsImg/grain.jpg";
import droughtField from "../../assets/images/MarketNewsImg/drought-field.jpg";
import livestock from "../../assets/images/MarketNewsImg/livestock.jpg";
import dairyFarm from "../../assets/images/MarketNewsImg/dairy-farm.jpg";
import fertilizer from "../../assets/images/MarketNewsImg/fertilizer.jpg";
import Weather from "../../assets/images/MarketNewsImg/weather.jpg";
import cheeseProduction from "../../assets/images/MarketNewsImg/cheese-production.jpg";
import organicGrains from "../../assets/images/MarketNewsImg/organic-grains.jpg";
import poultryFarm from "../../assets/images/MarketNewsImg/poultry-farm.jpg";
import riceField from "../../assets/images/MarketNewsImg/rice-field.jpg";

const MarketNews = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const articlesPerPage = 6;

  // Categories for filtering
  const categories = [
    { id: "all", name: "All News" },
    { id: "grain", name: "Grains" },
    { id: "livestock", name: "Livestock" },
    { id: "dairy", name: "Dairy" },
    { id: "commodities", name: "Commodities" },
    { id: "weather", name: "Weather Impact" },
    { id: "policy", name: "Policy & Trade" },
  ];

  // Sample news articles with images
  const newsArticles = [
    {
      id: 1,
      title: "Wheat Prices Surge Amid Global Supply Concerns",
      excerpt:
        "Global wheat prices jumped 7% as major exporters face production challenges due to adverse weather conditions.",
      date: "May 15, 2023",
      category: "grain",
      source: "AgriNews Daily",
      readTime: "4 min read",
      trending: true,
      image: wheatField,
    },
    {
      id: 2,
      title: "New Trade Agreement Boosts Corn Exports to Asia",
      excerpt:
        "The recent trade deal is expected to increase corn exports by 15% to Asian markets over the next quarter.",
      date: "May 12, 2023",
      category: "commodities",
      source: "Global Trade Review",
      readTime: "5 min read",
      trending: false,
      image: coffeePlantation,
    },
    {
      id: 3,
      title: "Drought Conditions Threaten Midwest Soybean Harvest",
      excerpt:
        "Persistent drought in the Midwest has farmers concerned about this year's soybean yield potential.",
      date: "May 10, 2023",
      category: "grain",
      source: "Farm Journal",
      readTime: "6 min read",
      trending: true,
      image: grain,
    },
    {
      id: 4,
      title: "Livestock Futures Rise on Strong Consumer Demand",
      excerpt:
        "Cattle and hog futures reached new highs as consumer demand for meat products continues to grow.",
      date: "May 8, 2023",
      category: "livestock",
      source: "Commodity Trader",
      readTime: "3 min read",
      trending: false,
      image: livestock,
    },
    {
      id: 5,
      title: "New Dairy Subsidies Announced to Support Small Farms",
      excerpt:
        "The government has unveiled a $500 million package to support small dairy operations facing market pressures.",
      date: "May 5, 2023",
      category: "dairy",
      source: "Policy Watch",
      readTime: "7 min read",
      trending: false,
      image: dairyFarm,
    },
    {
      id: 6,
      title: "El Niño Pattern Could Disrupt Global Agriculture Markets",
      excerpt:
        "Meteorologists predict a strong El Niño event that may significantly impact crop production worldwide.",
      date: "May 3, 2023",
      category: "weather",
      source: "Climate Impact Report",
      readTime: "8 min read",
      trending: true,
      image: Weather,
    },
    {
      id: 7,
      title: "Organic Grain Premiums Reach Record Highs",
      excerpt:
        "Price premiums for organic grains have increased by 22% as consumer demand continues to outpace supply.",
      date: "May 1, 2023",
      category: "commodities",
      source: "Organic Market Tracker",
      readTime: "4 min read",
      trending: false,
      image: organicGrains,
    },
    {
      id: 8,
      title: "New Tariffs on Fertilizer Imports Could Impact Farm Costs",
      excerpt:
        "Proposed tariffs on imported fertilizers may increase production costs for corn and wheat growers.",
      date: "April 28, 2023",
      category: "policy",
      source: "Ag Policy Digest",
      readTime: "6 min read",
      trending: true,
      image: fertilizer,
    },
    {
      id: 9,
      title: "Rice Production Forecast Revised Downward in Key Regions",
      excerpt:
        "Lower than expected rainfall has led analysts to reduce rice production forecasts by 8% in major growing regions.",
      date: "April 25, 2023",
      category: "grain",
      source: "CropWatch",
      readTime: "5 min read",
      trending: false,
      image: riceField,
    },
    {
      id: 10,
      title: "Poultry Prices Stabilize After Supply Chain Improvements",
      excerpt:
        "After months of volatility, poultry prices have stabilized as supply chain issues resolve.",
      date: "April 22, 2023",
      category: "livestock",
      source: "Poultry Times",
      readTime: "3 min read",
      trending: false,
      image: poultryFarm,
    },
    {
      id: 11,
      title: "Cheese Exports Reach Record Levels in Q1",
      excerpt:
        "Global cheese exports increased by 12% in the first quarter, driven by strong demand from emerging markets.",
      date: "April 18, 2023",
      category: "dairy",
      source: "Dairy Export Monitor",
      readTime: "4 min read",
      trending: true,
      image: cheeseProduction,
    },
    {
      id: 12,
      title: "Coffee Futures Surge as Brazilian Crop Faces Frost Threat",
      excerpt:
        "Coffee futures jumped 15% overnight as unseasonal cold threatens crops in Brazil's key growing regions.",
      date: "April 15, 2023",
      category: "commodities",
      source: "Commodities Daily",
      readTime: "4 min read",
      trending: true,
      image: coffeePlantation,
    },
  ];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeCategory, currentPage, searchQuery]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
                Market News & Insights
              </h1>
              <p className="text-gray-700 mt-2 max-w-2xl">
                Stay informed with the latest agricultural market trends, price
                movements, and industry analysis
              </p>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search market news..."
                  className="w-full md:w-80 p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-800 outline-none transition bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 absolute left-3 top-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Bar */}
        <div className="bg-gray-700 text-white rounded-xl p-5 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold">1,240</div>
              <div className="text-green-300 text-sm">Active Users</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold">86</div>
              <div className="text-green-300 text-sm">Markets Tracked</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-green-300 text-sm">Market Updates</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-green-300 text-sm">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Featured News Banner */}
        <div className="bg-gradient-to-r from-green-800 to-gray-900 rounded-2xl p-6 mb-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-black/80 z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center bg-gray-700 text-green-100 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Featured Report
              </div>
              <h2 className="text-2xl font-bold mb-3">
                Global Grain Outlook 2023: Production Forecasts & Price
                Projections
              </h2>
              <p className="mb-4 opacity-90">
                Comprehensive analysis of wheat, corn, and soybean markets with
                expert predictions for the coming harvest season.
              </p>
              <button className="bg-white text-green-800 hover:bg-green-100 py-2 px-5 rounded-lg font-medium transition-colors flex items-center">
                Read Full Report
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-gray-800 border-2 border-gray-700 rounded-xl w-48 h-48 flex items-center justify-center text-gray-500">
                <img src={grain} className="h-full rounded-md" alt="grain" />
              </div>
            </div>
          </div>
        </div>

        {/* Trending News Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
            <button className="text-green-800 hover:text-green-600 font-medium flex items-center">
              View all trending
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading
              ? // Skeleton loading for trending
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden"
                  >
                    <div className="animate-pulse">
                      <div className="bg-gray-200 h-48 w-full"></div>
                      <div className="p-5">
                        <div className="flex justify-between mb-4">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="flex justify-between mt-6">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : newsArticles
                  .filter((article) => article.trending)
                  .map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
                    >
                      <div className="h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span>News Image</span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`inline-block px-3 py-1 ${
                              article.category === "grain"
                                ? "bg-amber-100 text-amber-800"
                                : article.category === "livestock"
                                  ? "bg-red-100 text-red-800"
                                  : article.category === "dairy"
                                    ? "bg-blue-100 text-blue-800"
                                    : article.category === "commodities"
                                      ? "bg-purple-100 text-purple-800"
                                      : article.category === "weather"
                                        ? "bg-cyan-100 text-cyan-800"
                                        : "bg-green-100 text-green-800"
                            } rounded-full text-xs font-medium`}
                          >
                            {article.source}
                          </span>
                          <span className="text-xs text-gray-500">
                            {article.date}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">
                          {article.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {article.readTime}
                          </span>
                          <button className="text-green-800 hover:text-green-600 font-medium text-sm flex items-center">
                            Read More
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </section>

        {/* All News Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {activeCategory === "all"
                ? "All Market News"
                : `${categories.find((c) => c.id === activeCategory)?.name}`}
              <span className="text-green-800 ml-2">
                ({filteredArticles.length})
              </span>
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:border-green-800 outline-none bg-white">
                <option>Newest First</option>
                <option>Most Relevant</option>
                <option>Trending</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            // Skeleton loading for articles
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden"
                >
                  <div className="animate-pulse">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-5">
                      <div className="flex justify-between mb-4">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="flex justify-between mt-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredArticles.length === 0 ? (
                <div className="bg-white rounded-xl shadow border border-gray-200 p-12 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mt-4">
                    No articles found
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Try changing your search or filter criteria
                  </p>
                  <button
                    className="mt-4 bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
                    >
                      <div className="h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span>News Image</span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`inline-block px-3 py-1 ${
                              article.category === "grain"
                                ? "bg-amber-100 text-amber-800"
                                : article.category === "livestock"
                                  ? "bg-red-100 text-red-800"
                                  : article.category === "dairy"
                                    ? "bg-blue-100 text-blue-800"
                                    : article.category === "commodities"
                                      ? "bg-purple-100 text-purple-800"
                                      : article.category === "weather"
                                        ? "bg-cyan-100 text-cyan-800"
                                        : "bg-green-100 text-green-800"
                            } rounded-full text-xs font-medium`}
                          >
                            {article.source}
                          </span>
                          <span className="text-xs text-gray-500">
                            {article.date}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">
                          {article.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            {article.readTime}
                          </span>
                          <button className="text-green-800 hover:text-green-600 font-medium text-sm flex items-center">
                            Read Full
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {filteredArticles.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center space-x-1">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-50"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        currentPage === number
                          ? "bg-green-800 text-white"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-50"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-gray-500 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-black/50 z-0"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">
              Stay Ahead of the Market
            </h2>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Get exclusive market analysis, price forecasts, and industry
              insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button className="bg-white text-green-800 hover:bg-green-100 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-xs mt-4 opacity-75">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNews;
