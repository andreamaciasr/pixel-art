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
        />
      ))}
    </div>
  );
}
