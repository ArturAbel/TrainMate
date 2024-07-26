import { MdOutlineCancel, MdOutlineDone } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { IoMdInformation } from "react-icons/io";
import { useState } from "react";

import "./TrainerPanel.css";

const TrainerPanel = () => {
  const [pendingSessions, setPendingSessions] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2024-07-25",
      imageUrl: "https://via.placeholder.com/100",
    },
    // Add more sample data if needed
  ]);

  const [bookedSessions, setBookedSessions] = useState([]);

  const handleMoveToBooked = (id) => {
    const sessionToMove = pendingSessions.find((session) => session.id === id);
    setBookedSessions([...bookedSessions, sessionToMove]);
    setPendingSessions(pendingSessions.filter((session) => session.id !== id));
  };

  const handleMoveToPending = (id) => {
    const sessionToMove = bookedSessions.find((session) => session.id === id);
    setPendingSessions([...pendingSessions, sessionToMove]);
    setBookedSessions(bookedSessions.filter((session) => session.id !== id));
  };

  return (
    <section className="trainer-panel-section">
      <div className="trainer-panel-containers">
        <div className="trainer-panel-pending-container">
          <h2 className="trainer-panel-container-title">Pending Sessions</h2>
          <div className="trainer-panel-cards-container">
            {pendingSessions.map((session) => (
              <div key={session.id} className="trainer-panel-user-card">
                <div className="trainer-panel-card-image-container">
                  <img
                    className="trainer-panel-card-image"
                    src={session.imageUrl}
                    alt="owner"
                  />
                </div>
                <div className="trainer-panel-card-details">
                  <p>time request sent</p>
                  <p>{session.name}</p>
                  <p>requested date:{session.date}</p>
                  <p>requested time</p>
                  <LuMessageSquare className="trainer-panel-button-icon card-icon-message" />
                </div>
                <div className="trainer-panel-card-icons">
                  <div className="trainer-panel-card-icons-top">
                    <IoMdInformation className="trainer-panel-button-icon" />
                  </div>
                  <div className="trainer-panel-card-icons-bottom">
                    <MdOutlineCancel className="trainer-panel-button-icon" />
                    <MdOutlineDone
                      className="trainer-panel-button-icon"
                      onClick={() => handleMoveToBooked(session.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="trainer-panel-approved-container">
          <h2 className="trainer-panel-container-title">Booked Sessions</h2>
          <div className="trainer-panel-cards-container">
            {bookedSessions.map((session) => (
              <div key={session.id} className="trainer-panel-user-card">
                <div className="trainer-panel-card-image-container">
                  <img
                    className="trainer-panel-card-image"
                    src={session.imageUrl}
                    alt="owner"
                  />
                </div>
                <div className="card-details">
                  <p>Name: {session.name}</p>
                  <p>Date: {session.date}</p>
                  <button
                    className="move-button"
                    onClick={() => handleMoveToPending(session.id)}
                  >
                    Move to Pending
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerPanel;
