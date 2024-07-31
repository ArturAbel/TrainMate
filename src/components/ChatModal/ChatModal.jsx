import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

import "./ChatModal.css";

const ChatModal = ({ messages, onSendMessage, onClose, currentUserId }) => {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="chat-modal-overlay"></div>
      <div className="chat-modal">
        <div className="chat-header">
          <h2 className="chat-header-title">train.mate chat</h2>
          <button onClick={onClose}>
            <IoMdClose className="chat-close-icon" />
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.senderId === currentUserId ? "sent" : "received"
              }`}
            >
              <div className="chat-time-stamp-container">
                <p>{msg.timestamp.split("T")[0]}</p>
                <p>{msg.timestamp.split("T")[1].split("Z")[0]}</p>
              </div>
              <p className="msg-text">{msg.text}</p>
            </div>
          ))}
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
