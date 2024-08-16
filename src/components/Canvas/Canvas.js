import "./Canvas.css";
import { exportComponentAsPNG } from "react-component-export-image";
import { useState, useRef, useEffect } from "react";
import { SwatchesPicker } from "react-color";
import RestartButton from "../RestartButton/RestartButton";
import BackgroundColorButton from "../BackgroundColorButton/BackgroundColor";
import ExportButton from "../ExportButton/ExportButton";
import Panel from "../Panel/Panel";
import UndoButton from "../UndoButton/UndoButton";
import Pixel from "../Pixel/Pixel";
import Row from "../Row/Row";

export default function Canvas() {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [background, setBackground] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [undo, setUndo] = useState(false);
  const [canvasState, setCanvasState] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill("white"))
  );

  // function handleCanvasUpdate(canvas) {
  //   setCanvasState(canvas);
  // }

  function handleCanvasUpdate(newCanvas) {
    setCanvasState((prevState) => {
      // `prevState` is the current state value
      // console.log("Previous state:", prevState);

      // Return the updated state
      return newCanvas;
    });
  }

  function handleUndo() {
    setUndo(true);
    // console.log(undo);
  }

  function handleUndoComplete() {
    setUndo(false);
  }

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
    // console.log(canvasState);
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
          <div className="buttons-container">
            <RestartButton restart={restart} />
            <BackgroundColorButton
              className="button"
              color={selectedColor}
              handleSetBackground={handleSetBackground}
            />
            {/* <ExportButton canvasRef={canvasRef} /> */}
            <UndoButton handleUndo={handleUndo} />
          </div>
        </div>
        <div className="canvas-rows">
          {canvasState.map((row, rowIdx) => (
            <Row
              key={rowIdx}
              pixels={row.map((color, pixelIdx) => (
                <Pixel
                  key={`${rowIdx}-${pixelIdx}`}
                  isMouseDown={isMouseDown}
                  color={selectedColor}
                  reset={reset}
                  resetComplete={resetComplete}
                  background={background}
                  handleSetBackgroundComplete={handleSetBackgroundComplete}
                  handleUndoComplete={handleUndoComplete}
                  undo={undo}
                  handleCanvasUpdate={handleCanvasUpdate}
                  canvasState={canvasState}
                  pixelId={pixelIdx}
                  rowId={rowIdx}
                />
              ))}
            ></Row>
          ))}
        </div>
      </div>
    </div>
  );
}
