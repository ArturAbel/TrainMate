import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiMessageSquareDetail, BiShekel } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { MdFitnessCenter } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import CalenderModal from "../../components/CalenderModal/CalenderModal";
import "./TrainerDetails.css";
import { useSelector } from "react-redux";


const TrainerDetails = () => {
  const { id: trainerId } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [bookedLessons, setBookedLessons] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const generateAvailableHours = (date) => {
    const hours = [];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
  // Get the ID from the URL parameters
  const dispatch = useDispatch();
  const { id } = useParams();

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

    const formatDate = (date) => date.toISOString().split('T')[0];

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
          await setDoc(trainerRef, { availableSchedule: trainerData.availableSchedule }, { merge: true });
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
    if (trainers.length === 0) {
      console.log("Trainers array is empty. Fetching trainers...");
      dispatch(fetchTrainers());
    }
  };


  if (!trainer) {
    return <div>Loading...</div>;
  }

  const handleOpenCalender = () => {
    setIsCalenderOpen(true);
  };

  const handleCloseCalender = () => {
    setIsCalenderOpen(false);
    refetchTrainer();
  };

  return (
    <section className="trainer-profile-section" key={trainerId}>
      <div className="trainer-profile-content-container">
        <Link to={"/trainers"}>
          <IoMdArrowRoundBack className="trainer-profile-back-icon" />
        </Link>
        <div className="trainer-profile-content-intro">
          <div className="trainer-profile-image-container">
            <img className="trainer-profile-image" src={trainer.image} alt={trainer.name} />
          </div>
          <div className="trainer-profile-intro-container">
            <h1 className="trainer-profile-intro-name">{trainer.name}</h1>
            <p className="trainer-profile-intro-description">{trainer.description}</p>
            <p className="trainer-profile-intro-teach">
              <strong>Teaches:</strong>
              <span> {trainer.sport}</span>
            </p>
            <p className="trainer-profile-intro-teach">
              <strong>Location:</strong>
              <span> {trainer.location}</span>
            </p>

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const trainer = trainers.find((trainer) => trainer.uid === id);

  if (trainer) {
    const {
      lessonLength,
      description,
      address,
      reviews,
      ratings,
      image,
      sport,
      price,
      level,
      name,
      about,
    } = trainer;

    console.log(trainer);

    return (
      <section className="trainer-profile-section" key={trainer.id}>
        <div className="trainer-profile-content-container">
          <Link to={"/trainers"}>
            <IoMdArrowRoundBack className="trainer-profile-back-icon" />
          </Link>
          {/* Intro */}
          <div className="trainer-profile-content-intro">
            <div className="trainer-profile-image-container">
              <img className="trainer-profile-image" src={image} alt={name} />
            </div>
            <div className="trainer-profile-intro-container">
              <h1 className="trainer-profile-intro-name">{name}</h1>
              <p className="trainer-profile-intro-description">{description}</p>
              <p className="trainer-profile-intro-teach">
                <strong>teaches:</strong>
                <span> {sport}</span>
              </p>
              <p className="trainer-profile-intro-teach">
                <strong>location:</strong>
                <span> {address}</span>
              </p>
            </div>
          </div>

          {/* About Me */}
          <div className="trainer-profile-about-me-container">
            <h1 className="trainer-profile-about-me-title">about me</h1>
            <p className="trainer-profile-about-me-content">{about}</p>

          </div>
        </div>


        <div className="trainer-profile-about-me-container">
          <h1 className="trainer-profile-about-me-title">About Me</h1>
          <p className="trainer-profile-about-me-content">{trainer.description}</p>
        </div>

          {/* I Teach */}
          <div className="trainer-profile-teach-container">
            <h1 className="trainer-profile-teach-title">i teach</h1>
            <span className="trainer-profile-teach-spans">
              <span>{sport}</span>
              <span>
                {level.map((level, index) => (
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


        <div className="trainer-profile-teach-container">
          <h1 className="trainer-profile-teach-title">I Teach</h1>
          <span className="trainer-profile-teach-spans">
            <span>{trainer.sport}</span>
            <span className="trainer-profile-teach-span-level">{trainer.level}</span>
          </span>
        </div>

        <div className="trainer-profile-reviews-container">
          <h1 className="trainer-profile-teach-title">My Reviews</h1>
          <p>add reviews here</p>
        </div>
      </div>


      <div className="trainer-profile-actions-container">
        <div className="trainer-profile-actions-map">add map</div>
        <div className="trainer-profile-actions-data-container">
          <div className="trainer-profile-actions-data-item">
            <GoStarFill className="trainer-profile-button-icon" />
            <p>{trainer.reviews}</p>
          </div>
          <div className="trainer-profile-actions-data-item">
            <BiShekel className="trainer-profile-button-icon" />
            <p>{trainer.price}/lesson</p>

        {/* Right container */}
        <div className="trainer-profile-actions-container">
          <div className="trainer-profile-actions-map">add map</div>
          <div className="trainer-profile-actions-data-container">
            <div className="trainer-profile-actions-data-item">
              <GoStarFill className="trainer-profile-button-icon" />
              <p>{ratings}</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <BiShekel className="trainer-profile-button-icon" />
              <p>{price}/lesson</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <IoTime className="trainer-profile-button-icon" />
              <p>{lessonLength}</p>
            </div>

          </div>
          <div className="trainer-profile-actions-data-item">
            <IoTime className="trainer-profile-button-icon" />
            <p>45</p>
          </div>
        </div>
        <div className="trainer-profile-actions-buttons-container">
          <button className="button-transparent" id="trainer-book-button" onClick={handleOpenCalender}>
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
          trainerId={trainerId}
          userId={user && user.uid}
        />
      )}
    </section>
  );
};

export default TrainerDetails;




