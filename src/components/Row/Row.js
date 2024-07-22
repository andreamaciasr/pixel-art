import "./Row.css";
import Pixel from "../Pixel/Pixel";

export default function Row({ width, color }) {
  return (
    <div className="row">
      {Array.from({ length: width }).map((_, i) => (
        <Pixel color={color} key={i} />
      ))}
    </div>
  );
}
