import "./Row.css";
import Pixel from "../Pixel/Pixel";

export default function Row({ height, color }) {
  return (
    <div className="row">
      {Array.from({ length: height }).map((_, i) => (
        <Pixel color={color} />
      ))}
    </div>
  );
}
