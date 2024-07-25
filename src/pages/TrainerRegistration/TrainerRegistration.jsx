import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import { uploadUserProfileImage } from "../../redux/features/usersSlice";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { sports } from "../../utilities/constants";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchTrainers, updateTrainer, uploadTrainerProfileImage } from "../../redux/features/trainerSlice";

import "./TrainerRegistration.css";

export const TrainerRegistration = () => {
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    description: '',
    about: '',
    address: '',
    level: [],
    lessonLength: '',
    price: ''
  });

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const trainerData = trainers.find(
    (trainerObj) => trainerObj.uid === "8vYgnqL5o7sElCv6Hguf" //*todo - put user.uid here -
  );

  useEffect(() => {
    if (trainerData) {
      setFormData({
        name: trainerData.name,
        sport: trainerData.sport || '',
        description: trainerData.description || '',
        about: trainerData.about || '',
        address: trainerData.address || '',
        level: trainerData.level || [],
        lessonLength: trainerData.lessonLength || '',
        price: trainerData.price || ''
      });
    }
  }, [trainerData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadTrainerProfileImage(file, trainerData.uid));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        level: checked
          ? [...prevFormData.level, value]
          : prevFormData.level.filter(level => level !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trainerData) {
      dispatch(updateTrainer(trainerData.uid, formData));
    }
  };

  if (!trainerData || loading) {
    return <div>Loading trainer data...</div>;
  }

  const profileImageUrl =
    trainerData.image ||
    (user && user.photoURL
      ? user.photoURL
      : "/public/person1.jpg");

  return (
    <section className="trainer-registration-section">
      <div className="trainer-registration-instructions-container">
        <div>
          <h1 className="trainer-registration-instructions-title">
            Instructions
          </h1>
          <p className="trainer-registration-instructions-explanation">
            Explanation about the process
          </p>
        </div>
        <div className="trainer-registration-instructions-dos">
          <BsHandThumbsUp />
          Dos
        </div>
        <div className="trainer-registration-instructions-dos">
          <BsHandThumbsDown />
          dont's
        </div>
      </div>

      <div className="trainer-registration-form-container">
        <form className="trainer-registration-form" onSubmit={handleSubmit}>
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              Choose your sport
            </label>
            <select
              className="trainer-registration-form-input"
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
            >
              {sports.map((sport, index) => (
                <option
                  className="trainer-registration-form-option"
                  value={sport}
                  key={index}
                >
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* 1 */}
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              Add your full name
            </label>
            <input
              type="text"
              className="trainer-registration-form-input"
              name="name"
              value={trainerData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* 2 */}
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              Provide a short description
            </label>
            <input
              type="text"
              className="trainer-registration-form-input form-input-longer"
              name="description"
              placeholder="Ex: Aerobics coach with a focus on youth development."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              Write about yourself
            </label>
            <textarea
              className="trainer-registration-form-input form-textarea"
              name="about"
              placeholder="Ex: I have been training youth for over 3 years. My focus is on building foundational skills and instilling a well... My qualifications are...."
              value={formData.about}
              onChange={handleInputChange}
            />
          </div>

          {/* 3 */}
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              Your address
            </label>
            <input
              type="text"
              className="trainer-registration-form-input"
              name="address"
              placeholder="Ex: Tel Aviv"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="trainer-registration-input-container">
            <label htmlFor="" className="trainer-registration-form-label">
              Which level do you teach
            </label>

            {/* Make checkbox component */}
            <div className="trainer-registration-input-container">
              <label htmlFor="" className="trainer-registration-form-label">
                Which level do you teach
              </label>
              <div className="trainer-registration-input-container-level">
                <div className="trainer-registration-level-container">
                  <label className="trainer-registration-form-level-label">
                    Beginner
                  </label>
                  <input
                    type="checkbox"
                    className="trainer-registration-form-input-checkbox"
                    name="level"
                    value="Beginner"
                    checked={formData.level.includes("Beginner")}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="trainer-registration-level-container">
                  <label className="trainer-registration-form-level-label">
                    Intermediate
                  </label>
                  <input
                    type="checkbox"
                    className="trainer-registration-form-input-checkbox"
                    name="level"
                    value="Intermediate"
                    checked={formData.level.includes("Intermediate")}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="trainer-registration-level-container">
                  <label className="trainer-registration-form-level-label">
                    Advanced
                  </label>
                  <input
                    type="checkbox"
                    className="trainer-registration-form-input-checkbox"
                    name="level"
                    value="Advanced"
                    checked={formData.level.includes("Advanced")}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="trainer-registration-level-container">
                  <label className="trainer-registration-form-level-label">
                    Expert
                  </label>
                  <input
                    type="checkbox"
                    className="trainer-registration-form-input-checkbox"
                    name="level"
                    value="Expert"
                    checked={formData.level.includes("Expert")}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="trainer-registration-level-container">
                  <label className="trainer-registration-form-level-label">
                    Master
                  </label>
                  <input
                    type="checkbox"
                    className="trainer-registration-form-input-checkbox"
                    name="level"
                    value="Master"
                    checked={formData.level.includes("Master")}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="trainer-registration-input-container">
              <label className="trainer-registration-form-label">
                Your lesson duration
              </label>
              <input
                type="number"
                className="trainer-registration-form-input"
                name="lessonLength"
                placeholder="In minutes"
                max={120}
                min={45}
                value={formData.lessonLength}
                onChange={handleInputChange}
              />
            </div>

            {/* 5 */}
            <div className="trainer-registration-input-container">
              <label className="trainer-registration-form-label">
                Charge per lesson
              </label>
              <input
                type="number"
                className="trainer-registration-form-input"
                name="price"
                placeholder="In ₪"
                max={130}
                min={1}
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="trainer-registration-form-upload-image">
              <ProfileImageUploader
                profileImageUrl={"profileImageUrl"}
                handleImageChange={"handleImageChange"}
              />
            </div>
          </div>
          <button className="button-transparent" type="submit">
            Send Registration Details
          </button>
        </form>
      </div>
    </section>
  );
};

