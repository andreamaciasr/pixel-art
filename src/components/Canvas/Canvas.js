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
  return Array(25)
    .fill()
    .map(() => Array(25).fill(NOT_YET_SET_COLOR));
}

export default function Canvas() {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("pink");
  const [background, setBackground] = useState(NOT_YET_SET_COLOR);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [undo, setUndo] = useState(false);
  const [canvasState, setCanvasState] = useState(createFreshCanvasState());
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [history, setHistory] = useState([createFreshCanvasState()]);
  const [deleted, setDeleted] = useState([]);
  const [strokeLength, setStrokeLength] = useState(0);

  useEffect(() => {
    setBackground("white");
    console.log("history at beginning " + history);
  }, []);

  // useEffect(() => {
  //   handleHistoryUpdate();
  //  // console.log("history update colors " + history);
  // }, [canvasState]);

  function updateColors(color, rowId, pixelId) {
    setCanvasState((prevState) => {
      const newState = prevState.map((row) => [...row]);
      newState[rowId][pixelId] = color;
      return [...newState];
    });
      console.log(canvasState);
  }
  
  function handleAddToHistory() {
    setHistory((prevHistory) => [canvasState, ...prevHistory]);
  }

  function handleUndo() {
    if (history.length <= 1) {
      setCanvasState(createFreshCanvasState());
      setHistory([createFreshCanvasState()]);
      return;
    }
    setDeleted((prevDeleted) => [...prevDeleted, history[0]]);
    console.log("history before slice", history);
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(1);
      setCanvasState(newHistory[0]);
      console.log("history after slice", newHistory);
      return newHistory;
    });
  }

  function restart() {
    const updatedCanvas = createFreshCanvasState();
    handleCanvasUpdate(updatedCanvas);
    setHistory([]);
    setDeleted([]);
  }

  function handleCanvasUpdate(newCanvas) {
    setCanvasState(newCanvas);
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

  function handleCanvasUpdate(newCanvas) {
    setCanvasState(newCanvas);
  }

  return (
    <div onMouseDown={handleMouseDown}
     onMouseUp={handleMouseUp}>
      <div>You can draw if you want</div>
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
              setStrokeLength={setStrokeLength}
              strokeLength={strokeLength}
              handleAddToHistory={handleAddToHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
