import "./Canvas.css";
import { exportComponentAsPNG } from "react-component-export-image";
import { useState, useRef, useEffect } from "react";
import { SwatchesPicker } from "react-color";
import RestartButton from "../RestartButton/RestartButton";
import BackgroundColorButton from "../BackgroundColorButton/BackgroundColor";
import ExportButton from "../ExportButton/ExportButton";
import Panel from "../Panel/Panel";
import UndoButton from "../UndoButton/UndoButton";

export default function Canvas({ height, width }) {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [background, setBackground] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [undo, setUndo] = useState(false);
  const [changedPixelsState, setChangedPixelsState] = useState([]);

  const canvasRef = useRef();
  const changedPixelsRef = useRef([]);

  // useEffect(() => {
  //   if (undo) {
  //     // Once undo is triggered, reset undo state
  //     setUndo(false);
  //   }
  // }, [undo]);

  function handleUndo() {
    setUndo(true);
    console.log(undo);
  }

  function handleUndoComplete() {
    setUndo(false);
  }

  function handleMouseDown() {
    setIsMouseDown(true);
  }

  function handleMouseUp() {
    setIsMouseDown(false);
    changedPixelsRef.current = [];
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
            <UndoButton handleUndo={handleUndo} />
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
            changedPixels={changedPixelsRef}
            handleUndoComplete={handleUndoComplete}
            undo={undo}
            changedPixelsState={changedPixelsState}
            setChangedPixelsState={setChangedPixelsState}
          />
        </div>
      </div>
    </div>
  );
}
