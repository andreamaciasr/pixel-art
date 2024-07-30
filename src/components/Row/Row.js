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
        />
      ))}
    </div>
  );
}
