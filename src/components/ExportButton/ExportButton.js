import "./ExportButton.css";
import { exportComponentAsPNG } from "react-component-export-image";

export default function ExportButton({ canvasRef }) {
  return (
    <button onClick={() => exportComponentAsPNG(canvasRef)}>
      Export as PNG
    </button>
  );
}
