import "./Dimensions.css";
import { useState } from "react";
import Canvas from "../Canvas/Canvas";

export default function Dimensions() {
  const [height, setHeight] = useState(24);
  const [width, setWidth] = useState(24);

  function handleHeight(e) {
    setHeight(e.target.value);
  }

  function handleWidth(e) {
    setWidth(e.target.value);
  }

  return (
    <>
      <div className="dimensions">
        <label>
          width:&nbsp;&nbsp;
          <input type="text" value={width} onChange={handleWidth} />
        </label>
        <label>
          height:&nbsp;&nbsp;
          <input type="text" value={height} onChange={handleHeight} />
        </label>
      </div>
      <div className="canvas">
        <Canvas width={width} height={height} />
      </div>
    </>
  );
}
