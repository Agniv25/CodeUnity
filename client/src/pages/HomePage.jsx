import CodeEditor from "../components/CodeEditor";
import LeftSideBar from "../components/LeftSideBar";
import Header from "../components/Header";
import MessageContainer from "../components/MessageContainer";
import SingleEditor from "../components/SingleEditor";
import Output from "../components/Output";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import "../styles/HomePage.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { defineTheme } from "../lib/defineThemes";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
export default function HomePage() {
  const [idValue, setIdValue] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [members, setMembers] = useState([]);
  const [code, setCode] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [languageId, setLanguageId] = useState(63);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [html, setHtml] = useState("<h1>HELLO</h1>");
  const [css, setCss] = useState("*{background-color:#F8F8F8;}");
  const [js, setJs] = useState("");
  const [webSelected, setWebSelected] = useState("");
  const [childComponents, setChildComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState({});
  const [notConnectedComponents, setNotConnectedComponents] = useState("all");
  const [outputDetails, setOutputDetails] = useState();
  const [newIdValue, setNewIdValue] = useState("");

  const userName = useParams();
  // console.log(userName);
  useEffect(() => {
    joinRoom1();
  }, [newIdValue]);
  useEffect(() => {
    socket.on("receiveFiles", (obj) => {
      // console.log("the child Components are");
      // console.log(childComponents);
      // console.log("the obj is ");
      // console.log(obj);
      setChildComponents((childComponents) => [...childComponents, obj]);
    });
    return () => {
      socket.off("receiveFiles");
    };
  }, []);

  // useEffect(() => {
  //   if (webSelected.length > 0) {
  //     const child = [
  //       {
  //         id: "1",
  //         name: "index",
  //         type: "html",
  //         language: "html",
  //         roomId: "",
  //         languageId: "web",
  //         code: "",
  //       },
  //       {
  //         id: "2",
  //         name: "styles",
  //         type: "css",
  //         language: "css",
  //         roomId: "",
  //         languageId: "web",
  //         code: "",
  //       },
  //       {
  //         id: "3",
  //         name: "script",
  //         type: "js",
  //         language: "javascript",
  //         roomId: "",
  //         languageId: "web",
  //         code: "",
  //       },
  //     ];
  //     setChildComponents(child);
  //   }
  // }, [webSelected, idValue]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getFiles", {
        params: {
          username: userName.username,
          projectName: userName.projectName,
          projectType: userName.projectType,
        },
      })
      .then((response) => {
        setChildComponents(response.data);
        if (response.data[0].roomId !== "");
        setIdValue(response.data[0].roomId);
        setNewIdValue(response.data[0].roomId);
        console.log("the room will be joined");
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    socket.on("members", (memberArray) => {
      // console.log(memberArray);
      setMembers(memberArray);
    });
    return () => {
      socket.off("members");
    };
  }, []);

  useEffect(() => {
    socket.on("chat", ({ message, user, timeStamp }) => {
      // alert("hello");
      setChat((chat) => [...chat, { sender: user, message, timeStamp }]);
    });

    return () => {
      socket.off("chat");
      // socket.off("files");
    };
  }, []);

  const handleSend = () => {
    if (message === "") {
      return;
    }
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    axios
      .post("http://localhost:3001/sendmessage", {
        username: userName.username,
        message: message,
        roomId: idValue,
        timeStamp: formattedTime,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    socket.emit("message", { message, userName, timeStamp: formattedTime });
    setMessage("");
  };

  const compile = () => {
    setIsProcessing(true);
    const formData = {
      source_code: btoa(code),
      stdin: btoa(customInput),
      language_id: languageId,
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setIsProcessing(false);
      });
    // console.log("the current language is" + language);
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "content-type": "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setIsProcessing(false);
        setOutputDetails(response.data);
        // console.log("the current language id is " + languageId);
        // console.log("the current code is " + code);

        // console.log("response.data is ", response.data);
        return;
      }
    } catch (err) {
      // console.log("err", err);
      setIsProcessing(false);
    }
  };

  const handleThemeChange = (e) => {
    const theme = e;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then(() => {
        setTheme(theme.value);
      });
    }
  };

  const handleEditorChange = (code) => {
    if (webSelected === "html") {
      switch (webSelected) {
        case "html":
          setHtml(code);
          break;
        case "css":
          setCss(code);
          break;
        case "js":
          setJs(code);
          break;
      }
      console.log("html ocde is");
      console.log(html);
    }
    setCode(code);
    // if (socket === null) return;
    // socket.emit("code", code);
  };

  const generateId = () => {
    const id = nanoid();
    setIdValue(id);
    console.log(id);
  };
  const addRoomToDatabase = () => {
    axios
      .post("http://localhost:3001/joinroom", {
        roomId: idValue,
        users: userName.username,
      })
      .then((request) => console.log(request.data))
      .catch(() => {
        console.log("Unable to join");
      });
  };
  const fetchChatsFromDatabase = () => {
    axios
      .get("http://localhost:3001/getchats", {
        params: {
          roomId: idValue,
        },
      })
      .then((response) => {
        console.log("the response is");
        const messages = response.data.messages;
        const simplifiedMessage = messages.map(
          ({ sender, content, timestamp }) => ({
            sender,
            message: content,
            timeStamp: timestamp,
          })
        );
        setChat(simplifiedMessage);
      })
      .catch((error) => console.log(error));
  };
  const fetchComponentsFromDatabase = () => {
    if (webSelected === "html") return;
    axios
      .get("http://localhost:3001/getChildComponents", {
        params: { roomId: idValue },
      })
      .then((response) => {
        console.log("the child component is ");
        if (response.data === "first") {
          console.log("this is the first user");
          return;
        } else {
          setChildComponents(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (webSelected === "") {
      setChildComponents([]);
    }

    if (!idValue) {
      return;
    } else {
      socket.emit("joinroom", {
        userName,
        idValue,
      });
      setIsJoined(false);
      setIsConnected(true);
      addRoomToDatabase();
      fetchChatsFromDatabase();
      fetchComponentsFromDatabase();
    }
  };
  const joinRoom1 = () => {
    if (webSelected === "") {
      setChildComponents([]);
    }

    if (!idValue) {
      return;
    } else {
      socket.emit("joinroom", {
        userName,
        idValue,
      });
      setIsJoined(false);
      setIsConnected(true);
      addRoomToDatabase();
      fetchChatsFromDatabase();
      fetchComponentsFromDatabase();
    }
  };

  return (
    <>
      {isJoined && (
        <div className="inactive-window">
          <div className="join-room-form">
            <h1>
              <span>Code</span> Chat with
            </h1>
            <form>
              <p>Paste invitation ROOM ID</p>
              <input
                type="text"
                placeholder="ROOM ID"
                value={idValue}
                onChange={(e) => {
                  setIdValue(e.target.value);
                }}
                required
              />
              <input type="text" value={userName.username} disabled />
              <button onClick={joinRoom}>Join</button>
            </form>
            <p className="join-room-form-footer">
              If you don't have an invite then{" "}
              <span onClick={generateId}>create room</span>
            </p>
          </div>
        </div>
      )}
      {/* {console.log(userName.projectName)} */}
      <div className="home-page">
        {console.log("the child comonent are")}
        {console.log({ childComponents })}

        <Header
          theme={theme}
          handleThemeChange={handleThemeChange}
          setLanguageId={setLanguageId}
          compile={compile}
          setLanguage={setLanguage}
          isProcessing={isProcessing}
          childComponents={childComponents}
          userName={userName.username}
          projectName={userName.projectName}
          idValue={idValue}
        />

        <div className="main-container">
          <LeftSideBar
            isJoined={isJoined}
            isConnected={isConnected}
            setIsJoined={setIsJoined}
            memberArray={members}
            setIsChatting={setIsChatting}
            isChatting={isChatting}
            setWebSelected={setWebSelected}
            webSelected={webSelected}
            html={html}
            css={css}
            js={js}
            code={code}
            setCode={setCode}
            setLanguage={setLanguage}
            childComponents={childComponents}
            setChildComponents={setChildComponents}
            idValue={idValue}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            language={language}
            setNotConnectedComponents={setNotConnectedComponents}
            // setLanguage={setLanguage}
            setLanguageId={setLanguageId}
            socket={socket}
          />
          {console.log(code)}
          <div className="code-editor-window">
            {childComponents.length == 0 ? (
              <SingleEditor theme={theme} language={language} />
            ) : (
              childComponents &&
              childComponents.map((item, index) => (
                <CodeEditor
                  key={index}
                  // className={item.id === selectedComponent.id ? "hide" : ""}
                  setCode={setCode}
                  handleEditorChange={handleEditorChange}
                  language={item.language}
                  theme={theme}
                  editorId={item}
                  setChildComponents={setChildComponents}
                  childComponents={childComponents}
                  notConnectedComponents={notConnectedComponents}
                  setNotConnectedComponents={setNotConnectedComponents}
                  selectedComponent={selectedComponent}
                  userName={userName}
                  roomId={idValue}
                  code1={childComponents[parseInt(item.id) - 1].code}
                  isJoined={isJoined}
                  webSelected={webSelected}
                />
              ))
            )}
          </div>
          {/* {console.log("the value of html is" + html)} */}
          <div className="right-side-bar">
            {isChatting ? (
              <MessageContainer
                userName={userName.username}
                message={message}
                setMessage={setMessage}
                handleSend={handleSend}
                chat={chat}
              />
            ) : (
              <>
                <Output
                  html={html}
                  css={css}
                  js={js}
                  webSelected={webSelected}
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                  outputDetails={outputDetails}
                  compile={compile}
                  isProcessing={isProcessing}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
