import "./Row.css";
import Pixel from "../Pixel/Pixel";
import { useEffect } from "react";

export default function Row({ rowPixels, rowIdx, isMouseDown, background, hoveredPixel, setHoveredPixel, updateColors, canvasState, color }) {

  
  return (
    <div className="row">
      {rowPixels.map((pixel, pixelIdx) => (
        <Pixel 
          key={`${rowIdx}-${pixelIdx}`} 
          color={color} 
          rowId={rowIdx} 
          pixelId={pixelIdx} 
          isMouseDown={isMouseDown}
          //selectedColor={selectedColor}
          background={background}
          hoveredPixel={hoveredPixel}
          setHoveredPixel={setHoveredPixel}
          updateColors={updateColors}
          canvasState={canvasState}
          // handleMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
}