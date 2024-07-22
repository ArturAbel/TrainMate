import { TbCameraUp } from "react-icons/tb";
import { LoginInput } from '../../components/LoginInput/LoginInput';
import './UserSettings.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";


const UserSettings = () => {

  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector(state => state.trainer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState(null);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);



  return (
    <>
      <section className="user-settings-section">
        <nav className="account-settings-navbar">
          <button className="account-settings-link-button" onClick={handleDeleteClick}>
            Delete Account
          </button>
        </nav>
        <div className="account-settings-container">
          <h1 className="account-settings-title">
            Account Settings
          </h1>
          <div className="account-settings-image-container">
            <div className="image-display-left-box">
              <img src='/public/person1.jpg' alt="" className="image-display" />
              <button className="image-edit-button">Edit</button>
            </div>
            <div className="image-upload-right-box">
              <button className="image-upload-button button-transparent">
                <TbCameraUp className="camera-icon" />
                Upload Image
              </button>
              <p className="image-upload-restrictions">
                Maximum size – 2MB
                JPG or PNG format
              </p>
            </div>
          </div>
          <form className="account-settings-form">
            <LoginInput label="Full Name" name="fullName" placeholder="User Name" type="text" />
            <LoginInput label="Phone Number" name="phoneNumber" placeholder="Phone Number" type="tel" />
            <LoginInput label="Age" name="age" placeholder="Age" type="number" />
            <div className="favorite-trainers-container">
              <h1>Favorite Trainers</h1>
              <div className="favorite-trainers-grid">
              {loading && <p>Loading trainers...</p>}
              {error && <p>Error fetching trainers: {error}</p>}
              {trainers.length > 0 && trainers.map(trainer => (
                <div key={trainer.uid} className="mini-card">
                  <img src={trainer.photo} alt={trainer.name} className="mini-card-photo" />
                  <div className="mini-card-info">
                    <h4>{trainer.name}</h4>
                    <p>{trainer.sport}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
            <button type="submit" className="save-changes-button button-transparent">Save Changes</button>
          </form>
        </div>
      </section>
      <DeleteAccountModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Are you sure you want to delete your account?</h2>
        <button onClick={handleCloseModal}>Cancel</button>
        <button>Confirm</button>
      </DeleteAccountModal>
    </>
  );
};

export default UserSettings;

