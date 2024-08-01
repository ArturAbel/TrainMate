export const getUserDetails = (userId, isTrainer, users, trainers) => {
  const user = isTrainer
    ? users.find((u) => u.uid === userId)
    : trainers.find((t) => t.uid === userId);

  const userDetail1 = isTrainer
    ? user?.age || "Age not available"
    : user?.sport || "Sport not available";

  const userDetail2 = isTrainer
    ? user?.gender || "Gender not available"
    : user?.address || "Address not available";

  const userImage = isTrainer
    ? user?.photoURL || "/path/to/default/image.jpg"
    : user?.image || "/path/to/default/image.jpg";

  return { user, userDetail1, userDetail2, userImage };
};

export const findConversationAndCheckNew = (messages, userId, currentUserId) => {
  const conversation = messages.find(
    (message) =>
      message.participants.includes(userId) &&
      message.participants.includes(currentUserId)
  );
  const isNewConversation = conversation?.messages.length === 0;

  return { conversation, isNewConversation };
};

export const getMessagesForSelectedUser = (messages, currentUserId, selectedUser) => {
  const conversation = messages.find(
    (message) =>
      message.participants.includes(currentUserId) &&
      message.participants.includes(selectedUser)
  );
  return conversation?.messages || [];
};