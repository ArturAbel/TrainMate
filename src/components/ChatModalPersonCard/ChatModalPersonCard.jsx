import './ChatModalPersonCard.css';

const ChatModalPersonCard = ({ user, userDetail1, userDetail2, userImage, isNewConversation, onClick }) => {
  const userName = user?.displayName || user?.name || "Name not available";

  return (
    <div onClick={onClick} className="chat-person-card">
      <img src={userImage} alt={userName} />
      <div className="user-info">
        <div className="user-name">{userName}</div>
        <p>{userDetail1}</p>
        <p>{userDetail2}</p>
      </div>
      {isNewConversation && <span className="new-conversation-label">NEW!</span>}
    </div>
  );
};

export default ChatModalPersonCard;