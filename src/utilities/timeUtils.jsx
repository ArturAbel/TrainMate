// src/utils/timeUtils.js

export const formatDateWithHyphens = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCurrentTimeChecker = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  return {
    date: formatDateWithHyphens(currentDate),
    hour: `${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`,
    timestamp: currentDate.getTime(),
  };
};

export const convertTo24HourFormat = (time) => {
  const [hour, minutePart] = time.split(":");
  const [minute, period] = minutePart.split(" ");
  let hour24 = parseInt(hour, 10);
  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }
  return `${hour24.toString().padStart(2, "0")}:${minute}`;
};
