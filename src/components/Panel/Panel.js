import Row from "../Row/Row";

export default function Panel({
  isMouseDown,
  color,
  width,
  reset,
  resetComplete,
  background,
  handleSetBackgroundComplete,
  height,
  changedPixels,
  handleUndoComplete,
  undo,
  changedPixelsState,
  setChangedPixelsState,
}) {
  return (
    <div>
      {Array.from({ length: height }).map((_, i) => (
        <Row
          isMouseDown={isMouseDown}
          color={color}
          width={width}
          key={i}
          reset={reset}
          resetComplete={resetComplete}
          background={background}
          handleSetBackgroundComplete={handleSetBackgroundComplete}
          changedPixels={changedPixels}
          rowID={i}
          handleUndoComplete={handleUndoComplete}
          undo={undo}
          changedPixelsState={changedPixelsState}
          setChangedPixelsState={setChangedPixelsState}
        />
      ))}
    </div>
  );
}
