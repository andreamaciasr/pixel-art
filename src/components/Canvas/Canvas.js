import "./Canvas.css";
import { exportComponentAsPNG } from "react-component-export-image";
import { useState, useRef, useEffect } from "react";
import { SwatchesPicker } from "react-color";
import RestartButton from "../RestartButton/RestartButton";
import BackgroundColorButton from "../BackgroundColorButton/BackgroundColor";
import ExportButton from "../ExportButton/ExportButton";
import Panel from "../Panel/Panel";
import UndoButton from "../UndoButton/UndoButton";
import Row from "../Row/Row";


const NOT_YET_SET_COLOR = "not-yet-set";

function createFreshCanvasState() {
  return Array(18)
    .fill()
    .map(() => Array(18).fill(NOT_YET_SET_COLOR));
}

export default function Canvas() {
  const [selectedColor, setSelectedColor] = useState("pink");
  const [background, setBackground] = useState(NOT_YET_SET_COLOR);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [canvasState, setCanvasState] = useState(createFreshCanvasState());
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [history, setHistory] = useState([createFreshCanvasState()]);
  const [deleted, setDeleted] = useState([]);
  const [strokeLength, setStrokeLength] = useState(0);
  const [lastStreak, setLastStreak] = useState(0);
  const [streaksArray, setStreaksArray] = useState([]);

  useEffect(() => {
    setBackground("white");
    console.log("history at beginning " + history);
  }, []);


  function updateColors(color, rowId, pixelId) {
    setCanvasState((prevState) => {
      const newState = prevState.map((row) => [...row]);
      newState[rowId][pixelId] = color;
      return [...newState];
    });
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
    setHistory((prevHistory) => {
      const lastStreak = streaksArray[0];
      const newHistory = prevHistory.slice(lastStreak - 1);
      console.log("history: " + newHistory);
      setCanvasState(newHistory[0]);
      return newHistory;
    });
    setStreaksArray((prevStreaksArray) => prevStreaksArray.slice(1));
  }

  function countStreak() {
    setStrokeLength(strokeLength);
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

  function handleCanvasUpdate(newCanvas) {
    setCanvasState(newCanvas);
  }

  return (
    <div onMouseDown={handleMouseDown}
     onMouseUp={handleMouseUp}>
    <div>You can draw on this :-)</div>
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
              countStreak={countStreak}
              lastStreak={lastStreak}
              setLastStreak={setLastStreak}
              setStreaksArray={setStreaksArray}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
