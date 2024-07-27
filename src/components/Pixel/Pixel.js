import { useState, useEffect } from "react";
import "./Pixel.css";
import RestartButton from "../RestartButton/RestartButton";

export default function Pixel({
  color,
  reset,
  resetComplete,
  background,
  handleSetBackgroundComplete,
}) {
  const [pixelColor, setPixelColor] = useState(color);
  const [previousColor, setPreviousColor] = useState(color);
  const [currentBackground, setCurrentBackground] = useState("white");

  useEffect(() => {
    if (reset) {
      setPixelColor("white");
      handleRestart();
      resetComplete();
    }
  }, [reset, resetComplete]);

  useEffect(() => {
    if (background) {
      if (pixelColor === currentBackground) {
        setPreviousColor(color);
        setPixelColor(color);
        handleSetBackgroundComplete();
        setCurrentBackground(color);
      }
    }
  }, [background, handleSetBackgroundComplete]);

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
    setPreviousColor("white");
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
