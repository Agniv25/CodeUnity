import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
const CodeEditorWindow = ({
  onChange,
  language,
  theme,
  handleEditorChange,
  editorId,
  notConnectedComponents,
  setNotConnectedComponents,
  selectedComponent,
  userName,
  roomId,
  setCode,
  setLanguage,
  childComponents,
  setChildComponents,
  code1,
}) => {
  const editorRef = useRef(0);
  const [code, setCode1] = useState("");

  useEffect(() => {
    if (code1) {
      const timer = setTimeout(() => {
        setCode1(atob(code1));

        // setCode1(atob(code));
      }, 2000); // Timeout of 5 seconds (5000 milliseconds)

      // Cleanup function to clear the timer if component unmounts before the timeout
      return () => clearTimeout(timer);
    }
  }, []);

  const options = { padding: { top: 15 } };

  const handleEditorDidMount = (editor, monaco) => {
    // if (!roomId) return;
    if (roomId === "") {
      console.log("Room id is null");
      return;
    }
    editorRef.current = editor;
    // console.log(notConnectedComponents);
    console.log(childComponents);

    const doc = new Y.Doc(); // a collection of shared objects -> Text
    // Connect to peers (or start connection) with WebRTC

    const provider = new WebrtcProvider(`${roomId + editorId.id}`, doc);
    // console.log("the provider is" + provider);
    // console.log({ provider });

    const awareness = provider.awareness;
    console.log(awareness);
    awareness.on("change", (changes) => {
      const statesArray = Array.from(awareness.getStates());
      console.log(statesArray);

      statesArray.forEach((state) => {
        // console.log("the user is" + state[1].user.color);
        const clientId = state[0];
        // console.log("the live cursor is" + liveCursor);
        if (state[1].user) {
          const styleSheet = document.createElement("style");
          styleSheet.innerText = `
          .yRemoteSelectionHead-${clientId}{
            border-left: 2px solid ${state[1].user.color} ;
            position:relative;
          }
          .yRemoteSelectionHead-${clientId}::before {
            content: '${state[1].user.name}';
            color: white;
            top: -15px;
            position:absolute;
            left: -2px;
            background-color:${state[1].user.color};
            opacity:0.8;
            font-size:10px;
            padding-left:1px;
            margin-bottom:8px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top-left-radius:5px;

          }
        `;
          document.head.appendChild(styleSheet);
          // console.log("the color is" + state[1].user.color);
        }
      });
    });

    const usercolors = [
      "#001f3f", // dark blue
      "#8b8000", // dark yellow
      "#8b0000", // dark red
      "#9400d3", // dark violet
      "#8b4500", // dark orange
      "#8b4500", // another dark orange
      "#2a005e", // dark purple
      "#006300", // dark green
      "#6b0f1a", // dark crimson
      "#5c0e14", // dark maroon
      "#4e2a04", // dark brown
      "#3c1800", // dark chocolate
      "#462400", // dark sienna
      "#2a1801", // dark olive
      "#323200", // dark olive green
      "#1a2a00", // dark army green
      "#2a1a00", // dark bronze
      "#002a1a", // dark teal
      "#001a2a", // dark navy
      "#002a2a", // dark turquoise
    ];

    // Now you can use the darkColors array in your code.

    const myColor = usercolors[Math.floor(Math.random() * usercolors.length)];
    awareness.setLocalStateField("user", {
      name: userName.username,
      color: myColor,
    });
    const type = doc.getText("monaco");
    // Bind YJS to Monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      awareness
    );

    // Initialize YJS
  };

  const handleCodeChange = (value) => {
    console.log("the value of the code is " + value);
    setChildComponents((childComponents) => {
      const newData = childComponents;
      const index = parseInt(editorId.id) - 1;
      if (newData[index]) {
        newData[index] = { ...newData[index], code: btoa(value) };
      }
      return newData;
    });

    setCode1(value);
    if (selectedComponent.id === editorId.id) {
      setCode(value);
      // setLanguage(language);
    }
  };

  return (
    <div
      className={selectedComponent.id === editorId.id ? "codeEditor" : "hide"}
    >
      {console.log(childComponents)}
      <Editor
        className="code-editor-window"
        language={language}
        value={code}
        theme={theme || "vs-dark"}
        // placeholder="Type your code here"
        // defaultValue={"// Type your code here"}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount} // Pass undefined if condition is false
        lineDecorationsWidth={100}
        automaticLayout={true}
        options={options}
      />

      {/* {console.log(editorId)} */}
      {/* {console.log("code is" + code)} */}
    </div>
  );
};
export default CodeEditorWindow;
