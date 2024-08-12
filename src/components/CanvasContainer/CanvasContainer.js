import { useState } from "react";
import Canvas from "../Canvas/Canvas";

export default function CanvasContainer() {
  const [canvasList, setCanvasList] = useState([0]);

  function duplicateCanvas() {
    setCanvasList([...canvasList, canvasList.length]);
  }

  return (
    <div>
      <button onClick={duplicateCanvas}>Duplicate Canvas</button>
      {canvasList.map((_, index) => (
        <Canvas key={index} height={10} width={10} /> // Adjust height and width as needed
      ))}
    </div>
  );
}
