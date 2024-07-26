import { bookLesson } from "../../redux/features/usersSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CalenderModal.css";

const CalenderModal = ({
  availableSchedule,
  bookedLessons,
  onClose,
  trainerId,
  userId,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [localBookedLessons, setLocalBookedLessons] = useState(bookedLessons);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableHours(generateAvailableHours(date));
    setSelectedHour(null);
  };

  const generateAvailableHours = (date) => {
    const hours = [];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const formattedDate = date.toISOString().split("T")[0];
    const bookedHours = localBookedLessons
      .filter((lesson) => lesson.date === formattedDate)
      .map((lesson) => lesson.hour);

    for (let i = 10; i <= 18; i += 2) {
      const hour = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
      const hourDate = new Date(date);
      hourDate.setHours(i, 0, 0, 0);

      const isBooked = bookedHours.includes(hour);

      if (!isToday || (isToday && hourDate > now)) {
        hours.push({ hour, booked: isBooked });
      }
    }
    return hours;
  };
  const isDateAvailable = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return Object.prototype.hasOwnProperty.call(
      availableSchedule,
      formattedDate
    );
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date < now || !isDateAvailable(date);
    }
    return false;
  };

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleBookLesson = async () => {
    if (!selectedDate || !selectedHour) {
      alert("Please select both a date and an hour.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const booking = {
      date: formattedDate,
      hour: selectedHour,
    };

    try {
      dispatch(bookLesson(trainerId, userId, booking));
      setLocalBookedLessons((prevLessons) => [...prevLessons, booking]);
      setAvailableHours(generateAvailableHours(selectedDate));
    } catch (error) {
      alert("Error booking lesson: " + error.message);
    }

    onClose();
  };

  return (
    <div className="calender-modal">
      <div className="calender-modal-exit-button">
        <IoIosCloseCircleOutline className="exit-button" onClick={onClose} />
      </div>
      <Calendar
        tileDisabled={tileDisabled}
        onChange={handleDateChange}
        minDate={startOfMonth}
        value={selectedDate}
        maxDate={endOfMonth}
        locale="en-US"
      />
      {selectedDate && (
        <div className="available-hours">
          <h3>Available Hours for {selectedDate.toDateString()}</h3>
          {availableHours.length > 0 ? (
            <ul>
              {availableHours.map(({ hour, booked }, index) => (
                <li
                  key={index}
                  className={`${selectedHour === hour ? "selected-hour" : ""} ${
                    booked ? "booked-hour" : ""
                  }`}
                  onClick={() => !booked && handleHourClick(hour)}
                >
                  {hour}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available hours for this date.</p>
          )}
        </div>
      )}
      <div className="calender-modal-bottom-buttons-container">
        <button
          className="button-transparent"
          id="calender-cancel-button"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="button-transparent"
          id="calender-book-button"
          onClick={handleBookLesson}
        >
          Book Lesson
        </button>
      </div>
    </div>
  );
};

export default CalenderModal;
