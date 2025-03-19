import "./Row.css";
import Pixel from "../Pixel/Pixel";
import { useEffect } from "react";

export default function Row({ rowPixels, rowIdx, isMouseDown, background, hoveredPixel, setHoveredPixel, updateColors, canvasState, color, setStrokeLength, strokeLength, handleAddToHistory, countStreak, lastStreak, setLastStreak, setStreaksArray }) {

  
  return (
    <div className="row">
      {rowPixels.map((pixel, pixelIdx) => (
        <Pixel 
          key={`${rowIdx}-${pixelIdx}`} 
          color={color} 
          rowId={rowIdx} 
          pixelId={pixelIdx} 
          isMouseDown={isMouseDown}
          background={background}
          hoveredPixel={hoveredPixel}
          setHoveredPixel={setHoveredPixel}
          updateColors={updateColors}
          canvasState={canvasState}
          setStrokeLength={setStrokeLength}
          strokeLength={strokeLength}
          handleAddToHistory={handleAddToHistory}
          countStreak={countStreak}
          lastStreak={lastStreak}
          setLastStreak={setLastStreak}
          setStreaksArray={setStreaksArray}
        />
      ))}
    </div>
  );
}