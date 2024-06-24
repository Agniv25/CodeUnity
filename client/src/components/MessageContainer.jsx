import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faUser } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function MessageContainer({
  userName,
  message,
  setMessage,
  handleSend,
  chat,
}) {
  return (
    <div className="message-container">
      <div className="message-header">
        <FontAwesomeIcon className="icon-profile" icon={faUser} />
        <p>{userName}</p>
      </div>
      <div className="chat-container">
        {chat &&
          chat.map((item) =>
            item.sender === userName ? (
              <div className="chat-box-sender">
                <div className="user-1">{item.sender}</div>
                <div className="message">{item.message}</div>
                <div className="time">{item.timeStamp}</div>
              </div>
            ) : (
              <div className="chat-box-receiver">
                <div className="user-1">{item.sender}</div>
                <div className="message">{item.message}</div>
                <div className="time">{item.timeStamp}</div>
              </div>
            )
          )}
      </div>
      <form className="chat-input-container">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="send text"
        ></textarea>
        <FontAwesomeIcon
          className="icon-send"
          icon={faPaperPlane}
          onClick={handleSend}
        />
      </form>
    </div>
  );
}
