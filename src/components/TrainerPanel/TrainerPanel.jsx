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
    <div className="trainer-panel-container">
      <div className="content">
        <div className="left-content">
          <h2>Pending Sessions</h2>
          {pendingSessions.map((session) => (
            <div key={session.id} className="card">
              <img src={session.imageUrl} alt="owner" className="card-img" />
              <div className="card-details">
                <p>Name: {session.name}</p>
                <p>Date: {session.date}</p>
                <button
                  className="move-button"
                  onClick={() => handleMoveToBooked(session.id)}
                >
                  Move to Booked
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="right-content">
          <h2>Booked Sessions</h2>
          {bookedSessions.map((session) => (
            <div key={session.id} className="card">
              <img src={session.imageUrl} alt="owner" className="card-img" />
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
  );
};

export default TrainerPanel;
