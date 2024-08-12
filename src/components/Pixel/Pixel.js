import { useState, useEffect } from "react";
import "./Pixel.css";

export default function Pixel({
  color,
  reset,
  resetComplete,
  background,
  handleSetBackgroundComplete,
  isMouseDown,
  changedPixels,
  rowID,
  pixelID,
  handleUndoComplete,
  undo,
  changedPixelsState,
  setChangedPixelsState,
}) {
  const [pixelColor, setPixelColor] = useState("white"); //color intead of white
  const [previousColor, setPreviousColor] = useState("white");
  const [currentBackground, setCurrentBackground] = useState("white");

  useEffect(() => {
    if (reset) {
      setPixelColor("white");
      handleRestart();
      resetComplete();
      setCurrentBackground("white");
      setPreviousColor("white");
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

  useEffect(() => {
    if (undo) {
      console.log(changedPixels.current);
      handleUndoComplete();
    }
  }, [undo, handleUndoComplete]);

  function handleMouseDown() {
    handleMouseClick();
  }

  function handleMouseHover() {
    if (isMouseDown) {
      handleMouseClick();
    } else {
      setPixelColor(color);
    }
  }

  function handleMouseLeave() {
    setPixelColor(previousColor);
  }

  function handleMouseClick() {
    changedPixels.current.push({
      prevColor: previousColor,
      rowID: rowID,
      pixelID: pixelID,
    });
    console.log(changedPixels.current);
    setChangedPixelsState([...changedPixels.current]);
    setPreviousColor(color);
    setPixelColor(color);
  }

  function handleRestart() {
    setPreviousColor("white");
  }

  return (
    <div
      className="pixel"
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseHover}
      onMouseDown={handleMouseDown}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
