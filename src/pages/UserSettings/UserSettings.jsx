import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { deleteUser, fetchUsers, removeFavorite, updateUser, uploadUserProfileImage } from "../../redux/features/usersSlice";
import { deleteUserAccount } from "../../redux/features/authSlice";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";

import { LoginInput } from '../../components/LoginInput/LoginInput';
import './UserSettings.css';
import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import FavoriteTrainersSettings from "../../components/FavoriteTrainersSettings/FavoriteTrainersSettings";


const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading: usersLoading, error: usersError } = useSelector(state => state.users);
  const { trainers, loading: trainersLoading, error: trainersError } = useSelector(state => state.trainer);
  const { user } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ displayName: user?.displayName || "", phone: "", age: "" });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0 && user) {
      const userData = users.find(userObj => userObj.uid === user.uid);
      if (userData) {
        setFormState({ displayName: userData.displayName || "", phone: userData.phone || "", age: userData.age || "" });
      }
    }
  }, [users, user]);

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.uid, formState)).then(() => {
      dispatch(fetchUsers());
    });
  };

  const handleRemoveFavorite = (e, trainerId) => {
    e.preventDefault();
    try {
      dispatch(removeFavorite(user.uid, trainerId));
      dispatch(fetchUsers());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadUserProfileImage(file, user.uid));
    }
  };

  if (!user || usersLoading || trainersLoading) {
    return <div>Loading...</div>;
  }

  const userData = users.find(userObj => userObj.uid === user.uid);
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const profileImageUrl = userData.photoURL ||
    (user.providerData && user.providerData.length > 0 && user.providerData[0].providerId === 'google.com' ? user.photoURL : '/public/person1.jpg');

  return (
    <>
      {usersError && <div>{usersError.message}</div>}
      <section className="user-settings-section">
        <nav className="account-settings-navbar">
          <button className="account-settings-link-button" onClick={handleDeleteClick}>
            Delete Account
          </button>
        </nav>
        <div className="account-settings-container">
          <h1 className="account-settings-title">Account Settings</h1>
          <ProfileImageUploader profileImageUrl={profileImageUrl} handleImageChange={handleImageChange} />
          <form className="account-settings-form" onSubmit={handleSubmit}>
            <LoginInput label="Full Name" name="displayName" value={formState.displayName} type="text" onChange={handleChange} />
            <LoginInput label="Phone Number" name="phone" value={formState.phone} type="tel" onChange={handleChange} />
            <LoginInput label="Age" name="age" value={formState.age} type="number" onChange={handleChange} />
            <FavoriteTrainersSettings trainers={trainers} userData={userData} handleRemoveFavorite={handleRemoveFavorite} usersLoading={usersLoading} trainersError={trainersError} />
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




