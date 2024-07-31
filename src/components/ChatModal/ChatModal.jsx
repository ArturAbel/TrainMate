import { useState, useEffect, useRef } from 'react';
import './ChatModal.css';

const ChatModal = ({ messages, onSendMessage, onClose, currentUserId }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="chat-modal-overlay"></div>
      <div className="chat-modal">
        <div className="chat-header">
          <h2>Chat</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.senderId === currentUserId ? 'sent' : 'received'
                }`}
            >
              <p>{msg.timestamp}</p>
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
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatModal;



