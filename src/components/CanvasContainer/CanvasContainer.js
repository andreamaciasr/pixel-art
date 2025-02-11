import { useState } from "react";
import Canvas from "../Canvas/Canvas";

export default function CanvasContainer() {
  const [canvasList, setCanvasList] = useState([0]);

  function duplicateCanvas() {
    setCanvasList([...canvasList, canvasList.length]);
  }

  return (
    <div>
      <Canvas />
    </div>
  );
}
