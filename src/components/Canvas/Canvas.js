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
let id = 0;

const NOT_YET_SET_COLOR = "not-yet-set";

function createFreshCanvasState() {
  return Array(3)
    .fill()
    .map(() => Array(3).fill(NOT_YET_SET_COLOR));
}

export default function Canvas() {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");
  const [background, setBackground] = useState(NOT_YET_SET_COLOR);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [undo, setUndo] = useState(false);
  const [canvasState, setCanvasState] = useState(createFreshCanvasState());
  const [hoveredPixel, setHoveredPixel] = useState(null);

  function restart() {
    const updatedCanvas = canvasState.map((row) =>
      row.map(() => NOT_YET_SET_COLOR),
    );
    handleCanvasUpdate(updatedCanvas);
  }

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
    setBackground(selectedColor);
  }

  function restart() {
    setCanvasState(createFreshCanvasState());
  }

  function resetComplete() {
    setReset(false);
  }

  function updateColors(color, rowId, pixelId) {
    console.log("Updating colors", { color, rowId, pixelId });
    const updatedCanvas = canvasState.map((row, rIndex) => {
      return rIndex === rowId
        ? row.map((pixel, pIndex) => {
            return pIndex === pixelId ? color : pixel;
          })
        : row;
    });

    handleCanvasUpdate(updatedCanvas);
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
              key={++id}
              pixels={row.map((color, pixelIdx) => (
                <Pixel
                  key={`${rowIdx}-${pixelIdx}`}
                  isMouseDown={isMouseDown}
                  color={selectedColor}
                  reset={reset}
                  resetComplete={resetComplete}
                  background={background}
                  handleUndoComplete={handleUndoComplete}
                  undo={undo}
                  canvasState={canvasState}
                  pixelId={pixelIdx}
                  rowId={rowIdx}
                  hoveredPixel={hoveredPixel}
                  setHoveredPixel={setHoveredPixel}
                  updateColors={updateColors}
                />
              ))}
            ></Row>
          ))}
        </div>
      </div>
    </div>
  );
}
