import CalenderModal from "../../components/CalenderModal/CalenderModal";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { BiMessageSquareDetail, BiShekel } from "react-icons/bi";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdFitnessCenter } from "react-icons/md";
import { db } from "../../config/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoStarFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import { updateTrainer } from "../../redux/features/trainerSlice";

import "./TrainerDetails.css";

const TrainerDetails = () => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [bookedLessons, setBookedLessons] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [trainer, setTrainer] = useState(null);
  const { id: trainerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateAvailableHours = (date) => {
    const hours = [];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    for (let i = 10; i <= 18; i += 2) {
      const hour = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
      const hourDate = new Date(date);
      hourDate.setHours(i, 0, 0, 0);

      if (!isToday || (isToday && hourDate > now)) {
        hours.push(hour);
      }
    }
    return hours;
  };

  const generateAvailableSchedule = () => {
    const availableSchedule = {};
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const formatDate = (date) => date.toISOString().split("T")[0];

    for (let day = today.getDate(); day <= 31; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (date.getMonth() !== currentMonth) break;

      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 0 && dayOfWeek <= 4) {
        const formattedDate = formatDate(date);
        availableSchedule[formattedDate] = generateAvailableHours(date);
      }
    }
    return availableSchedule;
  };

  useEffect(() => {
    const fetchTrainer = async () => {
      const trainerRef = doc(db, "trainers", trainerId);
      const trainerDoc = await getDoc(trainerRef);
      if (trainerDoc.exists()) {
        let trainerData = trainerDoc.data();
        if (!trainerData.availableSchedule) {
          trainerData.availableSchedule = generateAvailableSchedule();
          await setDoc(
            trainerRef,
            { availableSchedule: trainerData.availableSchedule },
            { merge: true }
          );
        }
        setTrainer(trainerData);
        setBookedLessons(trainerData.bookedLessons || []);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  const refetchTrainer = async () => {
    const trainerRef = doc(db, "trainers", trainerId);
    const trainerDoc = await getDoc(trainerRef);
    if (trainerDoc.exists()) {
      let trainerData = trainerDoc.data();
      setTrainer(trainerData);
      setBookedLessons(trainerData.bookedLessons || []);
    }
  };

  if (!trainer) {
    return <div>Loading...</div>;
  }

  const handleOpenCalender = () => {
    if (!user) {
      navigate("/login");
    }
    setIsCalenderOpen(true);
  };

  const handleCloseCalender = () => {
    setIsCalenderOpen(false);
    refetchTrainer();
  };

  const handleReviewSubmit = () => {
    const reviewText = document.querySelector(".review-text-input").value;
    const reviewRating = document.querySelector(".review-rating-input").value;

    if (!reviewText || !reviewRating) {
      alert("Please provide a review and rating.");
      return;
    }

    const newReview = {
      userId: user.uid,
      userName: user.displayName,
      reviewText,
      reviewRating,
    };

    const updatedReviews = [...(trainer.reviews || []), newReview];

    const updatedData = {
      reviews: updatedReviews,
    };

    dispatch(updateTrainer(trainerId, updatedData));
  };

  return (
    <>
      <section className="trainer-profile-section" key={trainerId}>
        <div className="trainer-profile-content-container">
          <Link to={"/trainers"}>
            <IoMdArrowRoundBack className="trainer-profile-back-icon" />
          </Link>
          <div className="trainer-profile-content-intro">
            <div className="trainer-profile-image-container">
              <img
                className="trainer-profile-image"
                src={trainer.image}
                alt={trainer.name}
              />
            </div>
            <div className="trainer-profile-intro-container">
              <h1 className="trainer-profile-intro-name">{trainer.name}</h1>
              <p className="trainer-profile-intro-description">
                {trainer.description}
              </p>
              <p className="trainer-profile-intro-teach">
                <strong>Teaches:</strong>
                <span> {trainer.sport}</span>
              </p>
              <p className="trainer-profile-intro-teach">
                <strong>Location:</strong>
                <span> {trainer.address}</span>
              </p>
            </div>
          </div>

          {/* About me */}
          <div className="trainer-profile-about-me-container">
            <h1 className="trainer-profile-about-me-title">About Me</h1>
            <p className="trainer-profile-about-me-content">{trainer.about}</p>
          </div>

          {/* I teach */}
          <div className="trainer-profile-teach-container">
            <h1 className="trainer-profile-teach-title">I Teach</h1>
            <span className="trainer-profile-teach-spans">
              <span>{trainer.sport}</span>
              <span>
                {trainer.level.map((level, index) => (
                  <span
                    className="trainer-profile-teach-span-level"
                    key={index}
                  >
                    {level}
                  </span>
                ))}
              </span>
            </span>
          </div>

          {/* My reviews */}
          <div className="trainer-profile-reviews-container">
            <h1 className="trainer-profile-teach-title">My Reviews</h1>
            <div className="reviews-list">
              {/* Existing reviews will be displayed here */}
              <p>add reviews here</p>
            </div>
            <div className="review-input-container">
              <textarea
                className="review-text-input"
                placeholder="Write your review here..."
              ></textarea>
              <select className="review-rating-input">
                <option value="" disabled selected>
                  Select rating
                </option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              <button
                className="submit-review-button"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        {/* Right container */}
        <div className="trainer-profile-actions-container">
          <div className="trainer-profile-actions-map">add map</div>
          <div className="trainer-profile-actions-data-container">
            <div className="trainer-profile-actions-data-item">
              <GoStarFill className="trainer-profile-button-icon" />
              <p>{trainer.ratings}</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <BiShekel className="trainer-profile-button-icon" />
              <p>{trainer.price}/lesson</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <IoTime className="trainer-profile-button-icon" />
              <p>45</p>
            </div>
          </div>
          <div className="trainer-profile-actions-buttons-container">
            <button
              className="button-transparent"
              onClick={handleOpenCalender}
              id="trainer-book-button"
            >
              <MdFitnessCenter className="trainer-profile-button-icon" />
              Book a Training
            </button>
            <button className="button-transparent" id="trainer-profile-button">
              <BiMessageSquareDetail className="trainer-profile-button-icon" />
              Send Message
            </button>
            <button className="button-transparent" id="trainer-profile-button">
              <FiHeart className="trainer-profile-button-icon" />
              Add to Favorite
            </button>
          </div>
        </div>
        {isCalenderOpen && (
          <CalenderModal
            availableSchedule={trainer.availableSchedule}
            bookedLessons={bookedLessons}
            onClose={handleCloseCalender}
            userId={user && user.uid}
            userName={user && user.displayName}
            userImage={user && user.photoURL}
            trainerId={trainerId}
          />
        )}
      </section>
      <HomeDivider />
    </>
  );
};

export default TrainerDetails;
