import { bookLesson } from "../../redux/features/usersSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { useState } from "react";
import moment from "moment";

import "react-calendar/dist/Calendar.css";
import "./CalenderModal.css";
import "./CalenderModal.tablet.css";

const CalenderModal = ({
  availableSchedule,
  bookedLessons,
  onClose,
  trainerId,
  userId,
  userName,
  userImage,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [localBookedLessons, setLocalBookedLessons] = useState(bookedLessons);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(date);
    const hours = generateAvailableHours(formattedDate);
    setAvailableHours(hours);
    setSelectedHour(null);
  };

  const generateAvailableHours = (formattedDate) => {
    const hours = [];
    const now = moment();
    const isToday = now.format("YYYY-MM-DD") === formattedDate;
    const bookedHours = localBookedLessons
      .filter((lesson) => lesson.date === formattedDate)
      .map((lesson) => lesson.hour);

    if (availableSchedule[formattedDate]) {
      availableSchedule[formattedDate].forEach((hour) => {
        const hourParts = hour.split(":");
        const hourDate = moment().set({
          hour: parseInt(hourParts[0]),
          minute: 0,
          second: 0,
          millisecond: 0,
        });
        const isBooked = bookedHours.includes(hour);

        if (!isToday || (isToday && hourDate.isAfter(now))) {
          hours.push({ hour, booked: isBooked });
        }
      });
    }

    return hours;
  };

  const isDateAvailable = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return availableSchedule.hasOwnProperty(formattedDate);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const now = moment().startOf("day");
      const tileDate = moment(date).startOf("day");
      return tileDate.isBefore(now) || !isDateAvailable(date);
    }
    return false;
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleBookLesson = async () => {
    if (!selectedDate || !selectedHour) {
      alert("Please select both a date and an hour.");
      return;
    }

    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    const booking = {
      date: formattedDate,
      hour: selectedHour,
      approved: false,
    };

    try {
      await dispatch(
        bookLesson(trainerId, userId, booking, userName, userImage)
      );
      setLocalBookedLessons((prevLessons) => [...prevLessons, booking]);
      setAvailableHours(generateAvailableHours(formattedDate));
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
        minDate={new Date()}
        value={selectedDate}
        maxDate={
          new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        }
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
