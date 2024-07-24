import "./RestartButton.css";
import Row from "../Row/Row";
import { useState } from "react";

export default function RestartButton({
  color,
  width,
  height,
  reset,
  resetComplete,
  restart,
}) {
  function log(a) {
    console.log(a);
  }

  return (
    <div>
      <button onClick={restart}>Restart</button>

      {Array.from({ length: height }).map((_, i) => (
        <Row
          color={color}
          width={width}
          key={i}
          reset={reset}
          resetComplete={resetComplete}
        />
      ))}
    </div>
  );
}
