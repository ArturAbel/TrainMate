import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { anonymousImage, sports } from "../../utilities/constants";
import { deleteUserAccount } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormHook } from "../../hooks/useFormHook";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  uploadTrainerProfileImage,
  fetchTrainers,
  updateTrainer,
  deleteTrainer,
} from "../../redux/features/trainerSlice";

import "./css/TrainerSettings.css";
import "./css/TrainerSettings.tablet.css";
import "./css/TrainerSettings.phone.css";

const TrainerSettings = () => {
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const { input, setInput, handleInputChange } = useFormHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers.length > 0 && user) {
      const trainerData = trainers.find(
        (trainerObj) => trainerObj.uid === user.uid
      );
      if (trainerData) {
        setInput({
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
    }
  }, [trainers, user]);

  // Delete trainer modal
  const handleDeleteModal = () =>
    setIsModalOpen((previousState) => !previousState);

  const handleDeleteAccount = async () => {
    try {
      if (user) {
        dispatch(deleteTrainer(user.uid));
        dispatch(deleteUserAccount());
        handleDeleteModal();
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trainerData = trainers.find(
      (trainerObj) => trainerObj.uid === user.uid
    );
    if (trainerData) {
      dispatch(updateTrainer(trainerData.uid, input));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadTrainerProfileImage(file, user.uid));
    }
  };

  const trainerData = trainers.find(
    (trainerObj) => trainerObj.uid === user.uid
  );

  if (loading || !user || !trainerData) {
    return <Loader />;
  }

  const profileImageUrl = trainerData.image || user.photoURL || anonymousImage;

  return (
    <>
      <section className="trainer-settings-section">
        <div className="account-settings-navbar">
          <button
            className="account-settings-link-button"
            onClick={handleDeleteModal}
          >
            Delete Account
          </button>
        </div>
        <div className="trainer-settings-container">
          <h1 className="trainer-settings-title">Trainer Settings</h1>
          <form className="trainer-settings-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <ProfileImageUploader
                handleImageChange={handleImageChange}
                profileImageUrl={profileImageUrl}
              />
            </div>
            <div className="form-group">
              <LoginInput
                onChange={handleInputChange}
                labelClass="form-label"
                inputClass="form-input"
                value={input.name}
                label="Full Name"
                type="text"
                name="name"
              />
            </div>
            <div className="form-group">
              <LoginInput
                onChange={handleInputChange}
                label="Choose Your Sport"
                labelClass="form-label"
                inputClass="form-input"
                value={input.sport}
                type="select"
                name="sport"
                options={sports.map((sport) => ({
                  value: sport,
                  label: sport,
                }))}
              />
            </div>
            <div className="form-group">
              <LoginInput
                placeholder="Enter a short description."
                onChange={handleInputChange}
                label="Short Description"
                value={input.description}
                labelClass="form-label"
                inputClass="form-input"
                name="description"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="form-label">About Yourself</label>
              <textarea
                className="trainer-setting-form-textarea"
                placeholder="Tell about yourself"
                onChange={handleInputChange}
                value={input.about}
                name="about"
              />
            </div>
            <div className="form-group">
              <LoginInput
                onChange={handleInputChange}
                placeholder="Ex: Tel Aviv"
                labelClass="form-label"
                inputClass="form-input"
                value={input.address}
                label="Address"
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
                      checked={input.level?.includes(level)}
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
              <LoginInput
                label="Lesson Length (minutes)"
                onChange={handleInputChange}
                value={input.lessonLength}
                placeholder="In minutes"
                inputClass="form-input"
                labelClass="form-label"
                name="lessonLength"
                type="number"
                min={45}
                max={120}
              />
            </div>
            <div className="form-group">
              <LoginInput
                label="Price per Lesson (₪)"
                onChange={handleInputChange}
                labelClass="form-label"
                inputClass="form-input"
                value={input.price}
                placeholder="In ₪"
                type="number"
                name="price"
                min={1}
                max={130}
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
      <DeleteAccountModal isOpen={isModalOpen} onClose={handleDeleteModal}>
        <h2 className="account-delete-title">
          Are you sure you want to delete your account?
        </h2>
        <div className="account-delete-buttons-container">
          <button
            className="button-transparent"
            onClick={handleDeleteModal}
            id="account-delete-cancel"
          >
            Cancel
          </button>
          <button
            className="button-transparent"
            onClick={handleDeleteAccount}
            id="account-delete-confirm"
          >
            Confirm
          </button>
        </div>
      </DeleteAccountModal>
      <HomeDivider />
    </>
  );
};

export default TrainerSettings;
