import "./RestartButton.css";

export default function RestartButton({ restart }) {
  return (
    <div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
