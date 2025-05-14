import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/LandingPage/Home";

import ErrorPage from "../pages/LandingPage/ErrorPage";

import Dashboard from "../pages/Client-Dashboard/Dashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Dashboard route */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
