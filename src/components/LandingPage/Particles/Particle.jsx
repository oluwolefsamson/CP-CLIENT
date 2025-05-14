import { useEffect, useState } from "react";
import { Particles } from "../magicui/particles";

export function ParticlesDemo() {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, []);

  return (
    <div className="relative flex h-[400px] lg:h-[700px]    w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
