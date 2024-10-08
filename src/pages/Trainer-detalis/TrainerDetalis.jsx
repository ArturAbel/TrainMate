import { TrainerInfoReviewsModal } from "../../components/TrainerInfoReviewsModal/TrainerInfoReviewsModal";
import TrainerProfileMap from "../../components/TrainerProfileMap/TrainerProfileMap";
import { calculateAverageRatingInProfile } from "../../utilities/calculateAvgRating";
import { sortLevels } from "../../components/AdminTrainerCard/AdminTrainerCardLib";
import { fetchOrCreateConversation } from "../../redux/features/messagesSlice";
import CalenderModal from "../../components/CalenderModal/CalenderModal";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { BiMessageSquareDetail, BiShekel } from "react-icons/bi";
import { anonymousImage } from "../../utilities/constants";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Loader from "../../components/Loader/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdFitnessCenter } from "react-icons/md";
import { db } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import { GoStarFill } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  removeFavorite,
  addFavorite,
  fetchUsers,
} from "../../redux/features/usersSlice";

import "./css/TrainerDetails.css";
import "./css/TrainerDetails.tablet.css";
import "./css/TrainerDetails.phone.css";

const TrainerDetails = () => {
  const [readMoreReviews, setReadMoreReviews] = useState(false);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { users } = useSelector((state) => state.users);
  const [bookedLessons, setBookedLessons] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
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
      const hourDate = new Date(date);
      hourDate.setHours(i, 0, 0, 0);

      if (!isToday || (isToday && hourDate > now)) {
        const hour = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
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
    const endOfMonth = new Date(currentYear, currentMonth + 1, 1);

    const formatDate = (date) => date.toISOString().split("T")[0];

    for (
      let date = new Date(today);
      date <= endOfMonth;
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 0 && dayOfWeek <= 4) {
        // Sunday to Thursday
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

  // Handle the favorite logic
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && user) {
      const userData = users.find((userObj) => user.uid === userObj.uid);
      const favorite = userData?.favorites.includes(trainerId);
      setIsFavorite(favorite);
    }
  }, [user, users]);

  const handleAddFavorite = (userId, trainerId) => {
    dispatch(addFavorite(userId, trainerId));
    setIsFavorite(true);
  };

  const handleRemoveFavorite = (userId, trainerId) => {
    dispatch(removeFavorite(userId, trainerId));
    setIsFavorite(false);
  };

  if (!trainer) {
    return <Loader />;
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

  const handleSeeMoreReviews = () => {
    setReadMoreReviews((prev) => !prev);
  };

  const handleSendMessageClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(fetchOrCreateConversation({ currentUserId: user.uid, trainerId }));

    setTimeout(() => {
      navigate(`/messages/${user.uid}`);
    }, 1800); //will be fine for now
  };

  // Calculate rating from array
  const averageRating = calculateAverageRatingInProfile(trainer.reviews);
  // Sort levels
  const sortedLevels = sortLevels(trainer.level);
  
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
                {sortedLevels.map((level, index) => (
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
              <div className="trainer-profile-reviews-list-containers">
                {trainer.reviews.slice(0, 4).map((review, index) => (
                  <div
                    className="trainer-profile-reviews-list-container"
                    key={index}
                  >
                    <div className="trainer-profile-reviews-list-upper-container">
                      <div className="trainer-profile-reviews-list-image-container">
                        <img
                          className="trainer-profile-reviews-list-image"
                          src={review.photoURL || anonymousImage}
                          alt="image"
                        />
                      </div>
                      <p>{review.displayName}</p>
                    </div>
                    <ReactStars
                      activeColor="var(--background-secondary1)"
                      value={review.starRating}
                      edit={false}
                      count={5}
                      size={24}
                    />
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
              {readMoreReviews && (
                <TrainerInfoReviewsModal
                  handleSeeMoreReviews={handleSeeMoreReviews}
                  reviews={trainer.reviews}
                />
              )}
              <div className="trainer-profile-display-button-container">
                <button
                  id="trainer-details-display-button"
                  onClick={handleSeeMoreReviews}
                  className="button-transparent"
                >
                  show more reviews
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right container */}
        <div className="trainer-profile-actions-container">
          <div className="trainer-profile-actions-map">
            <TrainerProfileMap address={trainer.address} />
          </div>
          <div className="trainer-profile-actions-data-container">
            <div className="trainer-profile-actions-data-item">
              <GoStarFill className="trainer-profile-button-icon" />
              <p>{averageRating}</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <BiShekel className="trainer-profile-button-icon" />
              <p>{trainer.price}/lesson</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <IoTime className="trainer-profile-button-icon" />
              <p>{trainer.lessonLength}</p>
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
            <button
              className="button-transparent"
              id="trainer-profile-button"
              onClick={handleSendMessageClick}
            >
              <BiMessageSquareDetail className="trainer-profile-button-icon" />
              Send Message
            </button>
            {isFavorite ? (
              <button
                onClick={() => {
                  handleRemoveFavorite(user.uid, trainerId);
                }}
                className="button-transparent"
                id="trainer-profile-button"
              >
                <FaHeart className="trainer-profile-button-icon" />
                Remove from Favorite
              </button>
            ) : (
              <button
                onClick={() => handleAddFavorite(user.uid, trainerId)}
                className="button-transparent"
                id="trainer-profile-button"
              >
                <FiHeart className="trainer-profile-button-icon" />
                Add to Favorite
              </button>
            )}
          </div>
        </div>
        {isCalenderOpen && (
          <CalenderModal
            availableSchedule={trainer.availableSchedule}
            userName={user && user.displayName}
            userImage={user && user.photoURL}
            onClose={handleCloseCalender}
            bookedLessons={bookedLessons}
            userId={user && user.uid}
            trainerId={trainerId}
          />
        )}
      </section>
      <HomeDivider />
    </>
  );
};

export default TrainerDetails;
