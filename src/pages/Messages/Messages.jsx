import ChatModal from "../../components/ChatModal/ChatModal";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { db } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  toggleTraineeNewMessage,
  fetchUsers,
} from "../../redux/features/usersSlice";
import {
  toggleTrainerNewMessage,
  fetchTrainers,
} from "../../redux/features/trainerSlice";

import "./Messages.css";

const Messages = () => {
  const { currentUserId } = useParams();
  const dispatch = useDispatch();
  const {
    trainers,
    loading: trainersLoading,
    error: trainersError,
  } = useSelector((state) => state.trainer);
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  const [relevantUsers, setRelevantUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchMessages = async () => {
      const docRef = doc(db, "messages", "OXW5mmTL1rFRfpVrSMZp");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userIds = new Set();
        data.messages.forEach((message) => {
          if (message.participants.includes(currentUserId)) {
            message.participants.forEach((participant) => {
              if (participant !== currentUserId) {
                userIds.add(participant);
              }
            });
          }
        });
        setRelevantUsers([...userIds]);
        setMessages(data.messages);
      }
    };
    fetchMessages();
  }, [currentUserId]);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleSendMessage = async (text) => {
    const newMessage = {
      senderId: currentUserId,
      text,
      timestamp: new Date().toISOString(),
    };
    const docRef = doc(db, "messages", "OXW5mmTL1rFRfpVrSMZp");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedMessages = data.messages.map((message) => {
        if (
          message.participants.includes(selectedUser) &&
          message.participants.includes(currentUserId)
        ) {
          return {
            ...message,
            messages: [...message.messages, newMessage],
          };
        }
        return message;
      });
      await updateDoc(docRef, { messages: updatedMessages });
      setMessages(updatedMessages);
    }

    const isTrainerSending = trainers.some(
      (trainer) => trainer.uid === currentUserId
    );

    if (isTrainerSending) {
      dispatch(toggleTraineeNewMessage(true));
    } else {
      dispatch(toggleTrainerNewMessage(true));
    }
  };

  if (trainersLoading || usersLoading) {
    return <Loader />;
  }

  if (trainersError || usersError) {
    return <div>Error loading data</div>;
  }

  const isTrainer = trainers.some((trainer) => trainer.uid === currentUserId);

  return (
    <>
      <div
        className={`messages-section ${isModalOpen ? `overflow-hidden` : ``}`}
      >
        <h1 className="messages-section-title">Messenger</h1>
        <div className="trainer-chats-container">
          {relevantUsers.map((userId) => {
            const conversation = messages.find(
              (message) =>
                message.participants.includes(userId) &&
                message.participants.includes(currentUserId)
            );
            const user = isTrainer
              ? users.find((u) => u.uid === userId)
              : trainers.find((t) => t.uid === userId);
            const userName =
              user?.displayName || user?.name || "Name not available";
            const userDetail1 = isTrainer
              ? user?.age || "Age not available"
              : user?.sport || "Sport not available";
            const userDetail2 = isTrainer
              ? user?.gender || "Gender not available"
              : user?.address || "Address not available";
            const userImage = isTrainer
              ? user?.photoURL || "/path/to/default/image.jpg"
              : user?.image || "/path/to/default/image.jpg";
            const isNewConversation = conversation?.messages.length === 0;
            return (
              <div
                key={userId}
                onClick={() => handleUserClick(userId)}
                className="chat-person-card"
              >
                <img src={userImage} alt={userName} />
                <div className="user-info">
                  <div className="user-name">{userName}</div>
                  <p>{userDetail1}</p>
                  <p>{userDetail2}</p>
                </div>
                {isNewConversation && (
                  <span className="new-conversation-label">NEW!</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <ChatModal
          messages={
            messages.find(
              (message) =>
                message.participants.includes(currentUserId) &&
                message.participants.includes(selectedUser)
            )?.messages || []
          }
          onSendMessage={handleSendMessage}
          onClose={handleCloseModal}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
};

export default Messages;
