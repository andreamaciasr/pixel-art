import { useState, useEffect } from "react";
import "./Pixel.css";
import RestartButton from "../RestartButton/RestartButton";

export default function Pixel({ color, reset, resetComplete }) {
  const [pixelColor, setPixelColor] = useState(color);
  const [previousColor, setPreviousColor] = useState(color);

  useEffect(() => {
    if (reset) {
      setPixelColor("white");
      resetComplete();
    }
  }, [reset, resetComplete]);

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

  function handleRestart() {
    setPixelColor("white");
  }

  return (
    <div
      className="pixel"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseHover}
      onClick={handleMouseClick}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
