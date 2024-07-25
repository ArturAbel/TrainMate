import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import "./TrainerMessages.css";

const DUMMY_TRAINER_UID = "JU8g2TZmnFd2vhpmQs4l";

const TrainerMessages = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);
  const users = useSelector((state) => state.users.users);

  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSendMessage = () => {
    // Check if the trainer exists
    const trainer = trainers.find((t) => t.uid === DUMMY_TRAINER_UID);
    // Check if the user exists
    const user = users.find((u) => u.email === userEmail);

    if (trainer && user) {
      // If both exist, log success message
      console.log("Success! Message:", message);
      console.log("Trainer:", trainer);
      console.log("User:", user);
      // Clear input fields
      setMessage("");
      setUserEmail("");
    } else {
      // Handle validation error
      if (!trainer) {
        console.log("Trainer does not exist");
      }
      if (!user) {
        console.log("User does not exist");
      }
    }
  };

  return (
    <div className="trainer-messages-container">
      {/* Send Messages Container */}
      <div className="send-message-container">
        <h2>Send Message</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter user's Gmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        <h2>Messages</h2>
        {/* Placeholder for displaying messages */}
        <div className="message">
          <img
            src="https://api.adorable.io/avatars/23/abott@adorable.png"
            alt="User"
          />
          <p>User Name: This is a sample message</p>
        </div>
        {/* More messages will be displayed here */}
      </div>
    </div>
  );
};

export default TrainerMessages;
