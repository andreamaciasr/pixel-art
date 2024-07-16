import "./Canvas.css";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import Row from "../Row/Row";

export default function Canvas() {
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
      <Row width={8} color={selectedColor} />
    </>
  );
}
