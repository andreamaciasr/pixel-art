import { useState, useEffect } from "react";
import "./Pixel.css";

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
}) {
  function handleClick() {
    updateColors(color, rowId, pixelId);
  }

  function handleMouseHover() {
    if (isMouseDown) {
      console.log("Handled mouse down on hover");
      updateColors(color, rowId, pixelId);
    } else {
      setHoveredPixel({ row: rowId, column: pixelId });
    }
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
      // onMouseDown={handleMouseDown}
      style={{
        backgroundColor: thisPixelIsTheOneThatsHovered ? color : pixelColor,
      }}
    ></div>
  );
}
