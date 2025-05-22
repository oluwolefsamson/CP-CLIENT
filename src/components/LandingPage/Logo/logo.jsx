import React from "react";
import LogoImg from "../../../assets/images/logo.png";

const CropWiseLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={LogoImg}
        alt="Logo"
        className="h-[80px] rounded-full border-2 border-green-600"
      />
      <div
        className="flex items-center text-4xl font-black text-green-600"
        style={{ fontFamily: "'Poiret One', cursive" }}
      >
        CropWise
      </div>
    </div>
  );
};

export default CropWiseLogo;
