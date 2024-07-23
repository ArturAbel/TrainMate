import { TbCameraUp } from "react-icons/tb";
import { LoginInput } from '../../components/LoginInput/LoginInput';
import './UserSettings.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";
import { deleteUser, fetchUsers, removeFavorite, updateUser } from "../../redux/features/usersSlice";
import { deleteUserAccount } from "../../redux/features/authSlice";
import { useNavigate } from "react-router";

const UserSettings = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading, error: usersError } = useSelector(state => state.users);
  const { trainers, loading: trainersLoading, error: trainersError } = useSelector(state => state.trainer);
  const { user } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    displayName: user?.displayName || "",
    phone: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUser(user.uid));
      dispatch(deleteUserAccount());
      setIsModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.uid, formState)).then(() => {
      dispatch(fetchUsers()); 
    });
  };

  const handleRemoveFavorite = (e ,trainerId) => {
    e.preventDefault();
    try {
      dispatch(removeFavorite(user.uid, trainerId));
      dispatch(fetchUsers());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0 && user) {
      const userData = users.find(userObj => userObj.uid === user.uid);
      if (userData) {
        setFormState({
          displayName: userData.displayName || "",
          phone: userData.phone || "",
          age: userData.age || "",
        });
      }
    }
  }, [users, user]);

  if (!user || usersLoading || trainersLoading) {
    return <div className="">Loading...</div>;
  }

  const userData = users.find(userObj => userObj.uid === user.uid);

  if (!userData) {
    return <div className="">Loading user data...</div>;
  }

  const filteredFavoriteTrainers = trainers.filter(trainer => userData.favorites.includes(trainer.uid));

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
              <img src={user?.photoURL || '/public/person1.jpg'} alt="" className="image-display" />
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
          <form className="account-settings-form" onSubmit={handleSubmit}>
            <LoginInput
              label="Full Name"
              name="displayName"
              value={formState.displayName}
              type="text"
              onChange={handleChange}
            />
            <LoginInput
              label="Phone Number"
              name="phone"
              value={formState.phone}
              type="tel"
              onChange={handleChange}
            />
            <LoginInput
              label="Age"
              name="age"
              value={formState.age}
              type="number"
              onChange={handleChange}
            />
            <div className="favorite-trainers-container">
              <h1>Favorite Trainers</h1>
              <div className="favorite-trainers-grid">
                {usersLoading && <p>Loading favorites...</p>}
                {usersError && <p>Error fetching trainers: {usersError}</p>}
                {filteredFavoriteTrainers.length > 0 ? (filteredFavoriteTrainers.map(trainer => (
                  <div key={trainer.uid} className="mini-card">
                    <img src={trainer.photo} alt={trainer.name} className="mini-card-photo" />
                    <button className="remove-favorite-trainer-button" onClick={(e)=> handleRemoveFavorite(e,trainer.uid)}>
                      x
                    </button>
                    <div className="mini-card-info">
                      <h4>{trainer.name}</h4>
                      <p>{trainer.sport}</p>
                    </div>
                  </div>)
                )) : ("No Favorites Added")}
              </div>
            </div>
            <button type="submit" className="save-changes-button button-transparent">Save Changes</button>
          </form>
        </div>
      </section>
      <DeleteAccountModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Are you sure you want to delete your account?</h2>
        <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={handleDeleteAccount}>Confirm</button>
      </DeleteAccountModal>
    </>
  );
};

export default UserSettings;
