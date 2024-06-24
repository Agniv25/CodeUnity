import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
export default function SingleEditor({ theme }) {
  const handleCodeChange = () => {
    alert("Please create a file");
  };
  const options = { padding: { top: 15 } };
  return (
    <div className="codeEditor">
      <Editor
        className="code-editor-window"
        // language={language}
        // value={code}
        theme={theme || "vs-dark"}
        // placeholder="Type your code here"
        // defaultValue={"// Type your code here"}
        onChange={handleCodeChange}
        // onMount={handleEditorDidMount} // Pass undefined if condition is false
        lineDecorationsWidth={100}
        automaticLayout={true}
        options={options}
      />

      {/* {console.log(editorId)} */}
      {/* {console.log("code is" + code)} */}
    </div>
  );
}
