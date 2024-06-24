export default function Terminal({ outputDetails }) {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="output error">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="output accepted">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre className="output error">{`Time Limit Exceeded`}</pre>;
    } else {
      return <pre className="output error">{atob(outputDetails?.stderr)}</pre>;
    }
  };
  return (
    <div className="terminal-container">
      <p>Output Window</p>
      <div> {outputDetails ? <>{getOutput()}</> : null}</div>
    </div>
  );
}
