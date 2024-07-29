

import FilterOverlay from "../../components/FilterOverlay/FilterOverlay";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import { deleteTrainer } from "../../redux/features/trainerSlice";

import { deleteUser } from "../../redux/features/usersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import { db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import "./AdminRemoveUsersAndTrainers.css";

const AdminRemoveUsersAndTrainers = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainers());
  }, [dispatch]);

  const handleRemoveUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleRemoveTrainer = (trainerId) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      dispatch(deleteTrainer(trainerId));
    }
  };

  return (
    <div className="admin-remove-container">
      <h2>Admin Panel: Remove Users and Trainers</h2>
      <div className="admin-section">
        <h3>Users</h3>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : usersError ? (
          <p>Error loading users: {usersError}</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <p>{user.email}</p>
              <button onClick={() => handleRemoveUser(user.id)}>
                Remove User
              </button>
            </div>
          ))
        )}
      </div>
      <div className="admin-section">
        <h3>Trainers</h3>
        {trainersLoading ? (
          <p>Loading trainers...</p>
        ) : trainersError ? (
          <p>Error loading trainers: {trainersError}</p>
        ) : (
          trainers.map((trainer) => (
            // <TrainerCard key={trainer.uid} trainer={trainer}>
            <div key={trainer.uid} className="trainer-card">
              <h4>{trainer.name}</h4>
              <h4>{trainer.email}</h4>
              <button onClick={() => handleRemoveTrainer(trainer.uid)}>
                Remove Trainer
              </button>
            </div>
            // </TrainerCard>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminRemoveUsersAndTrainers;
