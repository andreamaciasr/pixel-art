import "./Canvas.css";
import { useState, useEffect } from "react";
import { TwitterPicker } from "react-color";
import Row from "../Row/Row";
import RestartButton from "../RestartButton/RestartButton";
import BackgroundColorButton from "../BackgroundColorButton/BackgroundColor";

export default function Canvas({ height, width }) {
  const [reset, setReset] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [background, setBackground] = useState(false);

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
    <>
      <TwitterPicker
        className="color-wheel"
        color={selectedColor}
        onChangeComplete={handleChangeComplete}
      />
      <RestartButton restart={restart} />
      <BackgroundColorButton
        color={selectedColor}
        handleSetBackground={handleSetBackground}
      />

      {Array.from({ length: height }).map((_, i) => (
        <Row
          color={selectedColor}
          width={width}
          key={i}
          reset={reset}
          resetComplete={resetComplete}
          background={background}
          handleSetBackgroundComplete={handleSetBackgroundComplete}
        />
      ))}
    </>
  );
}
