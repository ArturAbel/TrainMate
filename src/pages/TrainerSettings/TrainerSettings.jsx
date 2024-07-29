import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrainers,
  updateTrainer,
  uploadTrainerProfileImage,
} from "../../redux/features/trainerSlice";
import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import { sports } from "../../utilities/constants";
import "./TrainerSettings.css";

const TrainerSettings = () => {
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    description: "",
    about: "",
    address: "",
    level: [],
    lessonLength: "",
    price: "",
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
        sport: trainerData.sport || "",
        description: trainerData.description || "",
        about: trainerData.about || "",
        address: trainerData.address || "",
        level: trainerData.level || [],
        lessonLength: trainerData.lessonLength || "",
        price: trainerData.price || "",
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
    <section className="trainer-settings-section">
      <div className="trainer-settings-container">
        <h1 className="trainer-settings-title">Trainer Settings</h1>
        <form className="trainer-settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label"></label>
            <ProfileImageUploader
              profileImageUrl={profileImageUrl}
              handleImageChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Choose Your Sport</label>
            <select
              className="form-input"
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
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
              type="text"
              className="form-input"
              name="description"
              placeholder="Ex: Aerobics coach with a focus on youth development."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">About Yourself</label>
            <textarea
              className="form-textarea"
              name="about"
              placeholder="Ex: I have been training youth for over 3 years. My focus is on building foundational skills and instilling a well-rounded..."
              value={formData.about}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-input"
              name="address"
              placeholder="Ex: Tel Aviv"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Teaching Levels</label>
            <div className="form-checkbox-group">
              {["Beginner", "Intermediate", "Advanced", "Expert", "Master"].map(
                (level) => (
                  <div className="form-checkbox-container" key={level}>
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="level"
                      value={level}
                      checked={formData.level.includes(level)}
                      onChange={handleInputChange}
                    />
                    <label className="form-checkbox-label">{level}</label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Lesson Length (minutes)</label>
            <input
              type="number"
              className="form-input"
              name="lessonLength"
              placeholder="In minutes"
              max={120}
              min={45}
              value={formData.lessonLength}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price per Lesson (₪)</label>
            <input
              type="number"
              className="form-input"
              name="price"
              placeholder="In ₪"
              max={130}
              min={1}
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <button className="form-submit-button" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default TrainerSettings;
