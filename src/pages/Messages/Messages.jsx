import ChatModalPersonCard from "../../components/ChatModalPersonCard/ChatModalPersonCard";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import ChatModal from "../../components/ChatModal/ChatModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  findConversationAndCheckNew,
  getMessagesForSelectedUser,
  getUserDetails,
} from "./MessagesLib";
import {
  updateMessages,
  fetchMessages,
} from "../../redux/features/messagesSlice";

import "./css/Messages.css";
import "./css/Messages.tablet.css";
import "./css/Messages.phone.css";

const Messages = () => {
  const { currentUserId } = useParams();
  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.trainer);
  const { users } = useSelector((state) => state.users);
  const { messages, relevantUsers, loading, error } = useSelector(
    (state) => state.messages
  );
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
    dispatch(fetchMessages(currentUserId));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (selectedUser) {
      setSelectedUserMessages(
        getMessagesForSelectedUser(messages, currentUserId, selectedUser)
      );
    }
  }, [selectedUser, messages, currentUserId]);

  const handleUserClick = (userId) => {
    const isTrainer = trainers.some((trainer) => trainer.uid === currentUserId);
    const { user } = getUserDetails(userId, isTrainer, users, trainers);

    setSelectedUser(userId);
    setSelectedUserName(user?.displayName || user?.name || "Unknown User");
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleSendMessage = (text) => {
    dispatch(updateMessages({ currentUserId, selectedUser, text }));
  };

  if (loading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  const isTrainer = trainers.some((trainer) => trainer.uid === currentUserId);

  return (
    <>
      <div
        className={`messages-section ${isModalOpen ? `overflow-hidden` : ``}`}
      >
        <h1 className="messages-section-title">Messenger</h1>

        <div className="user-chats-container">
          {relevantUsers.map((userId) => {
            const { user, userDetail1, userDetail2, userImage } =
              getUserDetails(userId, isTrainer, users, trainers);
            const { isNewConversation } = findConversationAndCheckNew(
              messages,
              userId,
              currentUserId
            );
            return (
              <ChatModalPersonCard
                onClick={() => handleUserClick(userId)}
                isNewConversation={isNewConversation}
                userDetail1={userDetail1}
                userDetail2={userDetail2}
                userImage={userImage}
                key={userId}
                user={user}
              />
            );
          })}
        </div>
      </div>
      <HomeDivider />
      {isModalOpen && (
        <ChatModal
          selectedUserName={selectedUserName}
          onSendMessage={handleSendMessage}
          messages={selectedUserMessages}
          currentUserId={currentUserId}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Messages;
