import { useState, useEffect } from "react";
import "./Pixel.css";

export default function Pixel({ color }) {
  const [pixelColor, setPixelColor] = useState(color);
  const [previousColor, setPreviousColor] = useState(color);

  function handleMouseHover() {
    setPixelColor(color);
  }

  function handleMouseLeave() {
    setPixelColor(previousColor);
  }

  function handleMouseClick() {
    setPreviousColor(color);
    setPixelColor(color);
  }

  return (
    <div
      className="pixel"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      //   onMouseDown={handleMouseClick}
      onClick={handleMouseClick}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
