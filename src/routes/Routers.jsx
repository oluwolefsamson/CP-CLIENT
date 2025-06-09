import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/LandingPage/Home";

import ErrorPage from "../pages/LandingPage/ErrorPage";

import Dashboard from "../pages/Client-Dashboard/Dashboard";

import CropsPrice from "../pages/Client-Dashboard/Crops&Price";

import MarketNews from "../pages/Client-Dashboard/MarketNews";
import NearbyMarkets from "../pages/Client-Dashboard/NearbyMarkets";
import PriceAlert from "../pages/Client-Dashboard/PriceAlert";
import PriceTrend from "../pages/Client-Dashboard/PriceTrend";
import ProfileSetting from "../pages/Client-Dashboard/ProfileSetting";
import SubmitPrice from "../pages/Client-Dashboard/SubmitPrice";
import { Overview } from "../pages/Client-Dashboard/Overview";
import Dispute from "../pages/Client-Dashboard/Dispute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="crop-price" element={<CropsPrice />} />

        <Route path="market-news" element={<MarketNews />} />
        <Route path="nearby-market" element={<NearbyMarkets />} />
        <Route path="price-alert" element={<PriceAlert />} />
        <Route path="price-trend" element={<PriceTrend />} />

        <Route path="dispute" element={<Dispute />} />
        <Route path="profile-setting" element={<ProfileSetting />} />
        <Route path="submit-price" element={<SubmitPrice />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
