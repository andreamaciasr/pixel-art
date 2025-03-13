import { useState, useEffect } from "react";
import "./Pixel.css";
import { use } from "react";

export default function Pixel({
  color,
  isMouseDown,
  canvasState,
  rowId,
  pixelId,
  hoveredPixel,
  setHoveredPixel,
  updateColors,
  background,
  setStrokeLength,
  strokeLength,
  handleAddToHistory,
}) {



  function handleClick() {
    updateColors(color, rowId, pixelId);
    handleAddToHistory();
  }

  function handleMouseHover() {
    if (isMouseDown) {
      updateColors(color, rowId, pixelId);
      handleAddToHistory();
    } else {
      setHoveredPixel({ row: rowId, column: pixelId });
    }
  }

  function handleMouseLeave() {
    setHoveredPixel(null);
  }

  function handleMouseDown() {
  // setStrokeLength(strokeLength + 1);
    updateColors(color, rowId, pixelId);
    
  }

  function handleStrokeLength() {
    let length = 0;
    while(isMouseDown) {
      length++;
    }
    setStrokeLength(length);
    console.log(length);
  }

  const thisPixelIsTheOneThatsHovered =
    hoveredPixel?.row === rowId && hoveredPixel?.column === pixelId;

  const pixelColor =
    canvasState[rowId][pixelId] === "not-yet-set"
      ? background
      : canvasState[rowId][pixelId];
  
  return (
    <div
      className="pixel"
      onClick={handleClick}
      onMouseEnter={handleMouseHover}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: thisPixelIsTheOneThatsHovered ? color : pixelColor,
      }}
    ></div>
  );
}
