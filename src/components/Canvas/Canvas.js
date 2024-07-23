import "./Canvas.css";
import { useState, useEffect } from "react";
import { TwitterPicker } from "react-color";
import Row from "../Row/Row";
import RestartButton from "../RestartButton/RestartButton";

export default function Canvas({ height, width }) {
  let initialCanvas = Array.from({ length: height }, () => "white");

  const [selectedColor, setSelectedColor] = useState("white");
  const [initialPixels, setInitialPixels] = useState(initialCanvas);

  // reset pixels to white
  function resetCanvas() {
    setInitialPixels(Array.from({ length: height }, () => "white"));
  }

  function handleChangeComplete(color) {
    setSelectedColor(color.hex);
  }

  function restartCanvas() {
    setSelectedColor("white");
  }

  return (
    <>
      <div className="container">
        <RestartButton className="button" restartCanvas={restartCanvas} />
      </div>
      <TwitterPicker
        className="color-wheel"
        color={selectedColor}
        onChangeComplete={handleChangeComplete}
      />

      {Array.from({ length: height }).map((_, i) => (
        <Row
          color={selectedColor}
          width={width}
          key={i}
          restartCanvas={restartCanvas}
        />
      ))}
    </>
  );
}
