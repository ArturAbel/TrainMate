import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers, updateUser } from "../../redux/features/usersSlice";
import "./TrainerMessages.css";

const DUMMY_TRAINER_UID = "JU8g2TZmnFd2vhpmQs4l";

const TrainerMessages = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);
  const users = useSelector((state) => state.users.users);

  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentUserMessages, setCurrentUserMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSendMessage = () => {
    const trainer = trainers.find((t) => t.uid === DUMMY_TRAINER_UID);
    const user = users.find((u) => u.email === userEmail);

    if (trainer && user) {
      console.log("Trainer exists:", trainer);
      console.log("User exists:", user);
      console.log("Success! Message:", message);

      const newMessage = {
        message: message,
        name: trainer.name,
        image: "https://api.adorable.io/avatars/23/abott@adorable.png", // Placeholder image
      };

      const updatedData = {
        messages: [...(user.messages || []), newMessage],
      };

      dispatch(updateUser(user.id, updatedData));
      setCurrentUserMessages(updatedData.messages);

      setMessage("");
      setUserEmail("");
    } else {
      if (!trainer) {
        console.log("Trainer does not exist");
      }
      if (!user) {
        console.log("User does not exist");
      }
    }
  };

  useEffect(() => {
    if (userEmail) {
      const user = users.find((u) => u.email === userEmail);
      if (user) {
        setCurrentUserMessages(user.messages || []);
      } else {
        setCurrentUserMessages([]);
      }
    }
  }, [userEmail, users]);

  return (
    <div className="tm-container">
      {/* Send Messages Container */}
      <div className="tm-send-message-container">
        <h2>Send Message</h2>
        <div className="tm-input-container">
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="tm-input-container">
          <input
            type="email"
            placeholder="Enter user's Gmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <button className="message-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>

      {/* Messages Container */}
      <div className="tm-messages-container">
        <h2>Messages</h2>
        {currentUserMessages.length > 0 ? (
          currentUserMessages.map((msg, index) => (
            <div key={index} className="tm-message">
              <img src={msg.image} alt={msg.name} />
              <p>
                {msg.name}: {msg.message}
              </p>
            </div>
          ))
        ) : (
          <p>No messages found</p>
        )}
      </div>
    </div>
  );
};

export default TrainerMessages;
