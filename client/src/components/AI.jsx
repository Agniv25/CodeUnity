import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import rehypeHighlight from "rehype-highlight";
export default function AI() {
  const [history, setHistory] = useState([]);
  const [textValue, setTextValue] = useState();
  const secretKey = "AIzaSyAv4MkOZKe4939Am0qdW4xhSGzIjegRWOs";
  const genAI = new GoogleGenerativeAI(secretKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const historyEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the end of history window when history changes
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(history);
  }, [history]);

  async function run() {
    // For text-only input, use the gemini-pro model
    setTextValue("");

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });
    setHistory([...history, { role: "user", parts: textValue }]);

    const msg = textValue;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setHistory([
      ...history,
      { role: "user", parts: textValue },
      { role: "model", parts: text },
    ]);
    // console.log(history);
  }

  return (
    <div className="ai-window">
      <div className="history-window">
        {history.length > 0 && (
          <div>
            {history.map((item, index) => (
              <div key={index} className={item.role}>
                <div className="sender-information">
                  {item.role === "user" ? (
                    <FontAwesomeIcon
                      className="sender-icon-user"
                      icon={faUser}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="sender-icon-ai"
                      icon={faSlack}
                    />
                  )}
                  <div className="person">
                    {item.role === "user" ? "You" : "AI"}
                  </div>
                </div>
                <Markdown
                // rehypePlugins={[rehypeHighlight]}
                // rehypePlugins={[rehypeHighlight]}
                // className={item.parts.includes("```") ? "code-design" : ""}
                >
                  {item.parts}
                </Markdown>
              </div>
            ))}
            <div ref={historyEndRef}></div>{" "}
            {/* This empty div acts as a scroll target */}
          </div>
        )}
        {history.length === 0 && <p>Empty</p>}
      </div>
      <div className="ai-input-container">
        <textarea
          // className="ai-input-container"
          placeholder="Type Message..."
          spellCheck="false"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        ></textarea>
        <FontAwesomeIcon
          className="ai-icon-send"
          icon={faPaperPlane}
          onClick={run}
        />
      </div>
    </div>
  );
}
