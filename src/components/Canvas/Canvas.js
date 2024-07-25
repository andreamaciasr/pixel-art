import "./Canvas.css";
import { useState, useEffect } from "react";
import { TwitterPicker } from "react-color";
import Row from "../Row/Row";
import RestartButton from "../RestartButton/RestartButton";

export default function Canvas({ height, width }) {
  let initialCanvas = Array.from({ length: height }, () => "white");

  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [initialPixels, setInitialPixels] = useState(initialCanvas);

  // function handleResetButton() {
  //   // setReset(!reset);
  //   console.log(reset);
  //   setSelectedColor("white");
  //   console.log(selectedColor);
  // }

  function handleChangeComplete(color) {
    setSelectedColor(color.hex);
  }

  function restart() {
    setReset(true);
    setSelectedColor("white");
  }

  function resetComplete() {
    setReset(false);
  }

  return (
    <>
      <TwitterPicker
        className="color-wheel"
        color={selectedColor}
        onChangeComplete={handleChangeComplete}
      />
      <RestartButton restart={restart} />

      {Array.from({ length: height }).map((_, i) => (
        <Row
          color={selectedColor}
          width={width}
          key={i}
          reset={reset}
          resetComplete={resetComplete}
        />
      ))}
    </>
  );
}
