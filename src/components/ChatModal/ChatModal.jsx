import { formatTimestamp, scrollToBottom } from "./ChatModalLib";
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

import "./ChatModal.css";
import "./ChatModal.tablet.css";

const ChatModal = ({
  selectedUserName,
  currentUserId,
  onSendMessage,
  messages,
  onClose,
}) => {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  return (
    <>
      <div className="chat-modal-overlay"></div>
      <div className="chat-modal">
        <div className="chat-header">
          <h2 className="chat-header-title">{`${selectedUserName}'s chat`}</h2>
          <button onClick={onClose}>
            <IoMdClose className="chat-close-icon" />
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg) => {
            const { date, time } = formatTimestamp(msg.timestamp);
            return (
              <div
                key={msg.timestamp}
                className={`chat-message ${
                  msg.senderId === currentUserId ? "sent" : "received"
                }`}
              >
                <div className="chat-message-time-stamp-container">
                  <p>{date}</p>
                  <p>{time}</p>
                </div>
                <p className="chat-message-text">{msg.text}</p>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            className="button-transparent"
            onClick={handleSend}
            id="chat-button"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
