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
import { use } from "react";
let id = 0;

const NOT_YET_SET_COLOR = "not-yet-set";

function createFreshCanvasState() {
  return Array(10)
    .fill()
    .map(() => Array(10).fill(NOT_YET_SET_COLOR));
}

export default function Canvas() {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");
  const [background, setBackground] = useState(NOT_YET_SET_COLOR);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [undo, setUndo] = useState(false);
  const [canvasState, setCanvasState] = useState(createFreshCanvasState());
  const [hoveredPixel, setHoveredPixel] = useState(null);

function updateColors(color, rowId, pixelId) {
  setCanvasState(prevState => {
    const newState = prevState.map(row => [...row]);
    newState[rowId][pixelId] = color;
    return [...newState];
  });
}


  // function restart() {
  //   const updatedCanvas = canvasState.map((row) =>
  //     row.map(() => "white"),
  //   );
  //   handleCanvasUpdate(updatedCanvas);
  // }


  useEffect(() => {
    console.log("Updated canvasState:", canvasState);
  }, [canvasState]);

  useEffect(() => {
    setBackground("white");
  }, []);
  

  function restart() {
    const updatedCanvas = createFreshCanvasState();
    handleCanvasUpdate(updatedCanvas);
  }

  function handleCanvasUpdate(newCanvas) {
    setCanvasState(newCanvas);
  }

  function handleUndo() {
    setUndo(true);
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
    console.log("Previous canvas state:", canvasState);
    setBackground(selectedColor);
    console.log("New background color:", selectedColor);
  }

  function restart() {
    setCanvasState(createFreshCanvasState());
  }

  function resetComplete() {
    setReset(false);
  }

  function handleCanvasUpdate(newCanvas) {
    setCanvasState(newCanvas);
  }


  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
            rowPixels={row} 
            rowIdx={rowIdx}
            isMouseDown={isMouseDown}
            color={selectedColor}
            background={background}
            hoveredPixel={hoveredPixel}
            setHoveredPixel={setHoveredPixel}
            updateColors={updateColors}
            canvasState={canvasState}
            handleMouseDown={handleMouseDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
