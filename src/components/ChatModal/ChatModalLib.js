export const scrollToBottom = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};

export const formatTimestamp = (timestamp) => {
  const date = timestamp.split("T")[0];
  const time = timestamp.split("T")[1].split("Z")[0];
  return { date, time };
};