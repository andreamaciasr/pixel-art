import "./Row.css";
import Pixel from "../Pixel/Pixel";

export default function Row({
  width,
  color,
  reset,
  resetComplete,
  isMouseDown,
  background,
  handleSetBackgroundComplete,
  changedPixels,
  rowID,
  handleUndoComplete,
  undo,
  changedPixelsState,
  setChangedPixelsState,
}) {
  return (
    <div className="row">
      {Array.from({ length: width }).map((_, i) => (
        <Pixel
          isMouseDown={isMouseDown}
          color={color}
          key={i}
          reset={reset}
          resetComplete={resetComplete}
          background={background}
          handleSetBackgroundComplete={handleSetBackgroundComplete}
          changedPixels={changedPixels}
          rowID={rowID}
          pixelID={i}
          handleUndoComplete={handleUndoComplete}
          undo={undo}
          changedPixelsState={changedPixelsState}
          setChangedPixelsState={setChangedPixelsState}
        />
      ))}
    </div>
  );
}
