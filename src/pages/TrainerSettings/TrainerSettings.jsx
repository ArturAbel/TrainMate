import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { useDispatch, useSelector } from "react-redux";
import { sports } from "../../utilities/constants";
import { useState, useEffect } from "react";
import {
  fetchTrainers,
  updateTrainer,
  uploadTrainerProfileImage,
} from "../../redux/features/trainerSlice";

import "./TrainerSettings.css";

const TrainerSettings = () => {
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lessonLength: "",
    description: "",
    address: "",
    sport: "",
    about: "",
    level: [],
    price: "",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const trainerData = trainers.find(
    (trainerObj) => trainerObj.uid === user.uid
  );

  useEffect(() => {
    if (trainerData) {
      setFormData({
        lessonLength: trainerData.lessonLength || "",
        description: trainerData.description || "",
        address: trainerData.address || "",
        sport: trainerData.sport || "",
        about: trainerData.about || "",
        level: trainerData.level || [],
        price: trainerData.price || "",
        name: trainerData.name,
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
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        level: checked
          ? [...prevFormData.level, value]
          : prevFormData.level.filter((level) => level !== value),
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
    (user && user.photoURL ? user.photoURL : "/public/person1.jpg");

  return (
    <>
      <section className="trainer-settings-section">
        <div className="trainer-settings-container">
          <h1 className="trainer-settings-title">Trainer Settings</h1>
          <form className="trainer-settings-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label"></label>
              <ProfileImageUploader
                handleImageChange={handleImageChange}
                profileImageUrl={profileImageUrl}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                onChange={handleInputChange}
                className="form-input"
                value={formData.name}
                type="text"
                name="name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Choose Your Sport</label>
              <select
                onChange={handleInputChange}
                value={formData.sport}
                className="form-input"
                name="sport"
              >
                {sports.map((sport, index) => (
                  <option className="form-option" value={sport} key={index}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Short Description</label>
              <input
                placeholder="Enter a short description."
                onChange={handleInputChange}
                value={formData.description}
                className="form-input"
                name="description"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="form-label">About Yourself</label>
              <textarea
                placeholder="Tell about yourself"
                onChange={handleInputChange}
                className="trainer-setting-form-textarea"
                value={formData.about}
                name="about"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                onChange={handleInputChange}
                placeholder="Ex: Tel Aviv"
                value={formData.address}
                className="form-input"
                name="address"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Teaching Levels</label>
              <div className="form-checkbox-group">
                {[
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Expert",
                  "Master",
                ].map((level) => (
                  <div className="form-checkbox-container" key={level}>
                    <input
                      checked={formData.level.includes(level)}
                      onChange={handleInputChange}
                      className="form-checkbox"
                      type="checkbox"
                      value={level}
                      name="level"
                    />
                    <label className="trainer-setting-form-checkbox-label">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Lesson Length (minutes)</label>
              <input
                value={formData.lessonLength}
                onChange={handleInputChange}
                placeholder="In minutes"
                className="form-input"
                name="lessonLength"
                type="number"
                max={120}
                min={45}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Price per Lesson (₪)</label>
              <input
                onChange={handleInputChange}
                value={formData.price}
                className="form-input"
                placeholder="In ₪"
                type="number"
                name="price"
                max={130}
                min={1}
              />
            </div>
            <button
              className="button-transparent"
              id="trainer-setting-button"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
      <HomeDivider />
    </>
  );
};

export default TrainerSettings;
