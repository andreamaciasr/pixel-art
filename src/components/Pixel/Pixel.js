import { useState, useEffect } from "react";
import "./Pixel.css";

export default function Pixel({
  color,
  reset,
  resetComplete,
  background,
  handleSetBackgroundComplete,
  isMouseDown,
  handleCanvasUpdate,
  canvasState,
  changedPixels,
  rowId,
  pixelId,
  handleUndoComplete,
  undo,
}) {
  const [pixelColor, setPixelColor] = useState(color); //color intead of white
  const [previousColor, setPreviousColor] = useState("white");
  const [currentBackground, setCurrentBackground] = useState("white");

  useEffect(() => {
    if (reset) {
      restart();
      resetComplete();
      setCurrentBackground("white");
      setPreviousColor("white");
    }
  }, [reset, resetComplete]);

  // useEffect(() => {
  //   if (reset) {
  //     setPixelColor("white");
  //     handleRestart();
  //     resetComplete();
  //     setCurrentBackground("white");
  //     setPreviousColor("white");
  //   }
  // }, [reset, resetComplete]);

  useEffect(() => {
    if (background) {
      if (pixelColor === currentBackground) {
        setPreviousColor(color);
        setPixelColor(color);
        handleSetBackgroundComplete();
        setCurrentBackground(color);
      }
    }
  }, [background, handleSetBackgroundComplete]);

  // function handleMouseDown() {
  //   handleClick();
  // }

  function handleMouseHover() {
    // console.log("MouseHover: isMouseDown =", isMouseDown);
    if (isMouseDown) {
      handleClick();
    } else {
      // console.log("MouseHover: Updating color to", color);
      updateColors(color);
    }
  }

  function handleMouseLeave() {
    console.log("MouseLeave: Reverting to", previousColor);
    updateColors(previousColor);
  }

  // function handleMouseLeave() {
  //   // setPixelColor(previousColor);
  //   updateColors(previousColor);
  //   console.log(previousColor);
  // }

  // function handleMouseClick() {
  //   setPreviousColor(color);
  //   setPixelColor(color);
  // }

  function handleClick() {
    setPreviousColor(color);
    updateColors(color);
  }

  // function updateColors(color) {
  //   const updatedCanvas = canvasState.map((row, rIndex) =>
  //     rIndex === rowId
  //       ? row.map((pixel, pIndex) => (pIndex === pixelId ? color : pixel))
  //       : row
  //   );
  //   handleCanvasUpdate(updatedCanvas);
  //   console.log(canvasState);
  // }

  function updateColors(color) {
    console.log("Canvas state before update:", canvasState);
    const updatedCanvas = canvasState.map((row, rIndex) => {
      // console.log(`Updating row ${rIndex}, target rowId is ${rowId}`);
      return rIndex === rowId
        ? row.map((pixel, pIndex) => {
            // console.log(
            //   `Updating pixel ${pIndex} in row ${rIndex}, target pixelId is ${pixelId}`
            // );
            return pIndex === pixelId ? color : pixel;
          })
        : row;
    });

    handleCanvasUpdate(updatedCanvas);
    console.log("Updated canvas state:", updatedCanvas);
  }

  function restart() {
    const updatedCanvas = canvasState.map((row) => row.map(() => "white"));
    handleCanvasUpdate(updatedCanvas);
    setPreviousColor("white");
  }

  return (
    <div
      className="pixel"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseHover}
      // onMouseDown={handleMouseDown}
      style={{ backgroundColor: canvasState[rowId][pixelId] }}
    ></div>
  );
}
