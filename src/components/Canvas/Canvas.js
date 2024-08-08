import "./Canvas.css";
import { exportComponentAsPNG } from "react-component-export-image";
import { useState, useRef } from "react";
import { SwatchesPicker } from "react-color";
import RestartButton from "../RestartButton/RestartButton";
import BackgroundColorButton from "../BackgroundColorButton/BackgroundColor";
import ExportButton from "../ExportButton/ExportButton";
import Panel from "../Panel/Panel";

export default function Canvas({ height, width }) {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [background, setBackground] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const canvasRef = useRef();

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
            <ExportButton canvasRef={canvasRef} />
          </div>
        </div>
        <div className="canvas-rows" ref={canvasRef}>
          <Panel
            height={height}
            isMouseDown={isMouseDown}
            color={selectedColor}
            width={width}
            reset={reset}
            resetComplete={resetComplete}
            background={background}
            handleSetBackgroundComplete={handleSetBackgroundComplete}
          />
        </div>
      </div>
    </div>
  );
}
