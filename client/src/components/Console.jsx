export default function Console({ outputDetails, compile, isProcessing }) {
  console.log(outputDetails);
  return (
    <>
      <div className="console-window">
        {outputDetails &&
          (outputDetails.status.id == 3
            ? atob(outputDetails.stdout)
            : atob(outputDetails.compile_output))}
      </div>
      <div className="output-options">
        <p onClick={compile}>{isProcessing ? "Compiling..." : "RUN"}</p>
        <p>COPY</p>
        <p>RESET</p>
      </div>
    </>
  );
}
