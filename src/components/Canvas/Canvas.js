import "./Canvas.css";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import Row from "../Row/Row";

export default function Canvas({ width, height }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  function handleChangeComplete(color) {
    setSelectedColor(color.hex);
  }

  return (
    <>
      <TwitterPicker
        color={selectedColor}
        onChangeComplete={handleChangeComplete}
      />
      {Array.from({ length: width }).map((_, i) => (
        <Row color={selectedColor} height={height} />
      ))}
      {/* <Row height={height} color={selectedColor} /> */}
    </>
  );
}
