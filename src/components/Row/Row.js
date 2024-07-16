import "./Row.css";
import Pixel from "../Pixel/Pixel";

export default function Row({ width, color }) {
  return (
    <>
      {Array.from({ length: width }).map((_, i) => (
        <Pixel color={color} />
      ))}
    </>
  );
}
