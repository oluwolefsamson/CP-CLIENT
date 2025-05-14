import React from "react";

const LineShadowText = ({ children, className = "" }) => {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span
        className="absolute inset-0 bg-gradient-to-r from-black/10 to-white/0 animate-reveal blur-sm"
        aria-hidden="true"
      />
      <span className="relative text-black dark:text-white">{children}</span>
    </span>
  );
};

export default LineShadowText;
