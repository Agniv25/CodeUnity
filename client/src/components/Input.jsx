export default function Input({
  customInput,
  setCustomInput,
  compile,
  isProcessing,
}) {
  const handleCustomInput = (e) => {
    setCustomInput(e.target.value);
  };
  return (
    <>
      <textarea
        className="input-window"
        value={customInput}
        onChange={handleCustomInput}
        placeholder="Custom Input"
        spellCheck="false"
      ></textarea>
      <div className="output-options">
        <p onClick={compile}>{isProcessing ? "Compiling..." : "RUN"}</p>
        <p>COPY</p>
        <p>RESET</p>
      </div>
    </>
  );
}
