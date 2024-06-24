import { useState } from "react";
import "../styles/output.css";
import Console from "./Console.jsx";
import Input from "./Input.jsx";
import AI from "./AI.jsx";
import WebView from "./WebView.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { faTerminal, faCode } from "@fortawesome/free-solid-svg-icons";

export default function Output({
  html,
  css,
  js,
  webSelected,
  customInput,
  setCustomInput,
  outputDetails,
  compile,
  isProcessing,
}) {
  const [optionSelected1, setOptionSelected1] = useState("Web View");
  const [optionSelected2, setOptionSelected2] = useState("Console");
  const handleOptionSelect1 = (name) => {
    setOptionSelected1(name);
  };
  const handleOptionSelect2 = (name) => {
    setOptionSelected2(name);
  };
  // Define a variable to hold the component to be displayed
  let selectedComponent;

  // Conditionally assign the selected component based on the optionSelected state
  if (webSelected) {
    selectedComponent =
      optionSelected1 === "Web View" ? (
        <WebView html={html} css={css} js={js} />
      ) : (
        <AI />
      );
  } else {
    switch (optionSelected2) {
      case "Console":
        selectedComponent = (
          <Console
            outputDetails={outputDetails}
            compile={compile}
            isProcessing={isProcessing}
          />
        );
        break;
      case "Input":
        selectedComponent = (
          <Input
            customInput={customInput}
            setCustomInput={setCustomInput}
            compile={compile}
            isProcessing={isProcessing}
          />
        );
        break;
      case "AI":
        selectedComponent = <AI />;
        break;
      default:
        selectedComponent = null;
    }
  }
  return (
    <div className="output-bar">
      <div className="output-bar-header">
        {webSelected ? (
          <>
            <p
              className={
                optionSelected1 === "Web View"
                  ? "output-bar-header-selected"
                  : ""
              }
              onClick={() => handleOptionSelect1("Web View")}
            >
              Web View
            </p>

            <p
              className={
                optionSelected1 === "AI" ? "output-bar-header-selected" : ""
              }
              onClick={() => handleOptionSelect1("AI")}
            >
              AI
            </p>
          </>
        ) : (
          <>
            <p
              className={
                optionSelected2 === "Console"
                  ? "output-bar-header-selected"
                  : ""
              }
              onClick={() => handleOptionSelect2("Console")}
            >
              <FontAwesomeIcon
                className="output-header-icon"
                icon={faTerminal}
              />
              Console
            </p>
            <p
              className={
                optionSelected2 === "Input" ? "output-bar-header-selected" : ""
              }
              onClick={() => handleOptionSelect2("Input")}
            >
              <FontAwesomeIcon className="output-header-icon" icon={faCode} />
              Input
            </p>
            <p
              className={
                optionSelected2 === "AI" ? "output-bar-header-selected" : ""
              }
              onClick={() => handleOptionSelect2("AI")}
            >
              <FontAwesomeIcon className="output-header-icon" icon={faSlack} />
              AI
            </p>
          </>
        )}
      </div>
      <div className="output-window">{selectedComponent}</div>
    </div>
  );
}
