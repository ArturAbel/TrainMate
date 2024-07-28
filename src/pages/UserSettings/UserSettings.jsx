import FavoriteTrainersSettings from "../../components/FavoriteTrainersSettings/FavoriteTrainersSettings";
import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { deleteUserAccount } from "../../redux/features/authSlice";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  deleteUser,
  fetchUsers,
  removeFavorite,
  updateUser,
  uploadUserProfileImage,
} from "../../redux/features/usersSlice";

import "./UserSettings.css";
import { anonymousImage } from "../../utilities/constants";

const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  const {
    trainers,
    loading: trainersLoading,
    error: trainersError,
  } = useSelector((state) => state.trainer);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    displayName: user?.displayName || "",
    phone: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0 && user) {
      const userData = users.find((userObj) => userObj.uid === user.uid);
      if (userData) {
        setFormState({
          displayName: userData.displayName || "",
          phone: userData.phone || "",
          age: userData.age || "",
          gender: userData.gender || "",
        });
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
      navigate("/");
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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

  const userData = users.find((userObj) => userObj.uid === user.uid);
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const profileImageUrl =
    userData.photoURL ||
    (user.providerData &&
      user.providerData.length > 0 &&
      user.providerData[0].providerId === "google.com"
      ? user.photoURL
      : anonymousImage);

  return (
    <>
      {usersError && <div>{usersError.message}</div>}
      <section className="user-settings-section">
        <nav className="account-settings-navbar">
          <button
            className="account-settings-link-button"
            onClick={handleDeleteClick}
          >
            Delete Account
          </button>
        </nav>
        <div className="account-settings-container">
          <h1 className="account-settings-title">Account Settings</h1>
          <ProfileImageUploader
            handleImageChange={handleImageChange}
            profileImageUrl={profileImageUrl}
          />
          <form className="account-settings-form" onSubmit={handleSubmit}>
            <LoginInput
              value={formState.displayName}
              onChange={handleChange}
              labelClass={"login-input-label"}
              inputClass={"login-input"}
              name="displayName"
              label="Full Name"
              type="text"
            />
            <LoginInput
              labelClass={"login-input-label"}
              inputClass={"login-input"}
              value={formState.phone}
              onChange={handleChange}
              label="Phone Number"
              name="phone"
              type="tel"
            />
            <LoginInput
              labelClass={"login-input-label"}
              inputClass={"login-input"}
              onChange={handleChange}
              value={formState.age}
              type="number"
              label="Age"
              name="age"
            />
            <LoginInput
              labelClass={"login-input-label"}
              inputClass={"login-input"}
              onChange={handleChange}
              value={formState.gender}
              type="select"
              name="gender"
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
            <FavoriteTrainersSettings
              handleRemoveFavorite={handleRemoveFavorite}
              trainersError={trainersError}
              usersLoading={usersLoading}
              trainers={trainers}
              userData={userData}
            />
            <button
              className="button-transparent"
              id="save-changes-button"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
      <DeleteAccountModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="account-delete-title">
          Are you sure you want to delete your account?
        </h2>
        <div className="account-delete-buttons-container">
          <button
            className="button-transparent"
            onClick={handleCloseModal}
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

export default UserSettings;

