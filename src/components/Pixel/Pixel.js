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
  setLastStreak,
  setStreaksArray,
}) {
  function handleClick() {
    updateColors(color, rowId, pixelId);
    handleAddToHistory();
    setStrokeLength(strokeLength + 1);
  }

  function handleMouseHover() {
    if (isMouseDown) {
      setStrokeLength(strokeLength + 1);
      updateColors(color, rowId, pixelId);
      handleAddToHistory();
    } else {
      setHoveredPixel({ row: rowId, column: pixelId });
    }
  }

  function handleMouseUp() {
    setHoveredPixel(null);
    // after a streak is done, add the streak length to the streaks array
    if (strokeLength !== 0) {
      setLastStreak((prevLastStreak) => {
        return strokeLength;
      });
      updateStreaksArray();
      setStrokeLength(0);
    }
  }

  function updateStreaksArray() {
    setStreaksArray((prevStreaksArray) => [strokeLength, ...prevStreaksArray]);
  }


  function handleMouseDown() {
    setStrokeLength(strokeLength + 1);
    console.log("streak length: " + strokeLength);
    updateColors(color, rowId, pixelId);
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
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setHoveredPixel(null)}
      style={{
        backgroundColor: thisPixelIsTheOneThatsHovered ? color : pixelColor,
      }}
    ></div>
  );
}
