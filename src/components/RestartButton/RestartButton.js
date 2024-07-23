import "./RestartButton.css";

export default function RestartButton({ restartCanvas }) {
  return (
    <div>
      <button onClick={restartCanvas}> Restart</button>
    </div>
  );
}
