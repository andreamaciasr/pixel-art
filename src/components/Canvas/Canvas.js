import "./Canvas.css";
import { useState, useEffect } from "react";
import { TwitterPicker } from "react-color";
import Row from "../Row/Row";

export default function Canvas({ width, height }) {
  const [selectedColor, setSelectedColor] = useState("white");

  function handleChangeComplete(color) {
    setSelectedColor(color.hex);
  }

  return (
    <>
      <TwitterPicker
        color={selectedColor}
        onChangeComplete={handleChangeComplete}
      />
      {Array.from({ length: height }).map((_, i) => (
        <Row color={selectedColor} width={width} key={i} />
      ))}
    </>
  );
}
