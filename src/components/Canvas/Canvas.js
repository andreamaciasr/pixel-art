import "./Canvas.css";
import { useState, useEffect } from "react";
import { SwatchesPicker } from "react-color";
import Row from "../Row/Row";
import RestartButton from "../RestartButton/RestartButton";
import BackgroundColorButton from "../BackgroundColorButton/BackgroundColor";

export default function Canvas({ height, width }) {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [background, setBackground] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  function handleMouseDown() {
    setIsMouseDown(true);
  }

  function handleMouseUp() {
    setIsMouseDown(false);
  }

  function handleChangeComplete(color) {
    setSelectedColor(color.hex);
  }

  function handleSetBackground() {
    setBackground(true);
  }

  function handleSetBackgroundComplete() {
    setBackground(false);
  }

  function restart() {
    setReset(true);
  }

  function resetComplete() {
    setReset(false);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="main-container">
        <div className="options-container">
          <div className="color-picker-container">
            <SwatchesPicker
              className="color-wheel"
              color={selectedColor}
              onChangeComplete={handleChangeComplete}
            />
          </div>
          <div classname="buttons-container">
            <RestartButton restart={restart} />
            <BackgroundColorButton
              className="button"
              color={selectedColor}
              handleSetBackground={handleSetBackground}
            />
          </div>
        </div>
        <div className="canvas-rows">
          {Array.from({ length: height }).map((_, i) => (
            <Row
              isMouseDown={isMouseDown}
              color={selectedColor}
              width={width}
              key={i}
              reset={reset}
              resetComplete={resetComplete}
              background={background}
              handleSetBackgroundComplete={handleSetBackgroundComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
