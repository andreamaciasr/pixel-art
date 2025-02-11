export default function UndoButton({ handleUndo }) {
  return (
    <button className="undo-button" onClick={handleUndo}>
      Undo
    </button>
  );
}
