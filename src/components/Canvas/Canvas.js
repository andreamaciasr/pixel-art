import "./Canvas.css";
import { useState } from "react";
import Pixel from "../Pixel/Pixel";
import { TwitterPicker } from "react-color";

export default function Canvas() {
  const [selectedColor, setSelectedColor] = useState("white");

  function handleChangeComplete(color) {
    setSelectedColor(color.hex);
    console.log(selectedColor);
  }

  return (
    <>
      <TwitterPicker
        color={selectedColor}
        onChangeComplete={handleChangeComplete}
      />
      <Pixel color={selectedColor} />
      <Pixel color={selectedColor} />
      <Pixel color={selectedColor} />

      {/* <Pixel color={selectedColor} onChangeComplete={handleChangeComplete} /> */}
    </>
  );
}
