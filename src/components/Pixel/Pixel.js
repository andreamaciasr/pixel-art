import { useState, useEffect } from "react";
import "./Pixel.css";

export default function Pixel({ color }) {
  const [pixelColor, setPixelColor] = useState(color);

  //   useEffect(() => {
  //     setPixelColor(color);
  //   }, [color]);

  function handleMouseHover() {
    setPixelColor(pixelColor);
  }

  function handleMouseLeave() {
    setPixelColor(pixelColor);
  }

  function handleMouseClick() {
    console.log(color, pixelColor);
    setPixelColor(color);
  }

  return (
    <div
      className="pixel"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
