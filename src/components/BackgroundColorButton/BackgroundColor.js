import { useEffect } from "react";
import "./BackgroundColorButton.css";

export default function BackgroundColorButton({ color, handleSetBackground }) {
  return (
    <div>
      <button
        className="backgroundColorButton"
        style={{ backgroundColor: color }}
        onClick={handleSetBackground}
      >
        Set Background Color
      </button>
    </div>
  );
}
