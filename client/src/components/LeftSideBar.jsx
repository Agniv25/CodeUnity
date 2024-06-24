import { useState, useEffect } from "react";
import "../styles/leftSideBar.css";
// import Language from "./Language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import { io } from "socket.io-client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LanguageOption from "./LanguageOption";
import CreateFile from "./CreateFile";
export default function LeftSideBar({
  isJoined,
  setIsJoined,
  memberArray,
  isConnected,
  isChatting,
  setIsChatting,
  webSelected,
  setWebSelected,
  html,
  css,
  js,
  setCode,
  setLanguage,
  language,
  code,
  childComponents,
  setChildComponents,
  idValue,
  selectedComponent,
  setSelectedComponent,
  setNotConnectedComponents,
  setLanguageId,
  languageId,
  socket,
  // setLanguage,
}) {
  // const [selected, setSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  // const [type, setType] = useState("");
  const [plus, setPlus] = useState(false);
  const [fileType, setFileType] = useState("");
  const [subLanguageId, setSubLanguageId] = useState("");
  // const socket = io("http://localhost:3001");

  const showJoinRoomWindow = () => {
    setIsJoined(!isJoined);
  };
  const addComponent = () => {
    setPlus((plus) => !plus);
    const obj = {
      id: childComponents.length + 1,
      name: fileName,
      type: fileType,
      language: language,
      roomId: idValue,
      languageId: subLanguageId,
    };
    if (idValue.length > 0) {
      axios
        .post("http://localhost:3001/addChildComponents", {
          obj,
          idValue,
        })
        .then((response) => console.log(response));
      socket.emit("sendFiles", obj);
    }

    //     .catch((error) => console.log(error));
    setChildComponents([...childComponents, obj]);
    // setSelectedComponent(obj);
    // setLanguage(obj.language);
    setNotConnectedComponents(obj.id);
  };
  const handleSelectedComponent = (component) => {
    setSelectedComponent(component);
    setLanguage(component.language);
    setLanguageId(component.languageId);
  };
  const handleMessage = () => {
    setIsChatting(!isChatting);
  };

  const changeLanguage = (name) => {
    setWebSelected(name);
    setCode("");
    switch (name) {
      case "html":
        setLanguage("html");
        setCode(html);
        break;
      case "css":
        setLanguage("css");
        setCode(css);
        break;
      case "js":
        setLanguage("javascript");
        setCode(js);
        break;
    }
  };
  return (
    <>
      {plus && (
        <CreateFile
          fileName={fileName}
          setFileName={setFileName}
          setFileType={setFileType}
          fileType={fileType}
          addComponent={addComponent}
          setLanguage={setLanguage}
          setSubLanguageId={setSubLanguageId}
        />
      )}
      {/* {console.log(plus)} */}
      <div className="left-side-bar">
        <div className="files">
          <div className="file-header">
            <p>Files</p>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => {
                setPlus((plus) => !plus);
                // addComponents();
              }}
            />
          </div>

          <div className="file-names">
            {childComponents.map((item) => (
              <LanguageOption
                key={item.id}
                isSelected={selectedComponent.id === item.id}
                onSelect={() => handleSelectedComponent(item)}
                code={code}
                setCode={setCode}
                name={item.name}
                type={item.type}
              />
            ))}
          </div>
        </div>

        {/* {console.log(memberArray)} */}
        <div className="side-bar-info">
          {memberArray.length === 0 ? (
            <p>You are not connected to any room</p>
          ) : (
            memberArray.map((members) => <p>{members.username}</p>)
          )}
        </div>
        {/* {console.log(childComponents)}
        {console.log(selectedComponent)} */}
        {isConnected ? (
          <div>
            <button onClick={handleMessage}>Message</button>
            <button className="red-button">Leave</button>
          </div>
        ) : (
          <button onClick={showJoinRoomWindow}>Join Room</button>
        )}
      </div>
    </>
  );
}
