import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import { deleteTrainer } from "../../redux/features/trainerSlice";
import { deleteUser } from "../../redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  const [filteredByEmail, setFilteredByEmail] = useState(users);
  const [input, setInput] = useState("");

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

  const handleSearch = (e) => {
    const search = e.target.value;
    setInput(search);

    if (search === "") {
      setFilteredByEmail(users);
      return;
    }

    const filterData = users.filter((user) => user.email.includes(search));
    setFilteredByEmail(filterData);
  };

  return (
    <section className="admin-users-section">
      <h1 className="admin-users-title">
        Admin Panel: Remove Users and Trainers
      </h1>
      <div className="admin-users-search-container">
        <input
          onChange={handleSearch}
          className="admin-users-search"
          placeholder="Search Email"
          value={input}
          type="text"
        />
      </div>

      <div className="admin-users-containers">
        <div>
          <h3 className="admin-container-title">Users</h3>
          <div className="admin-container">
            {usersLoading ? (
              <p>Loading users...</p>
            ) : usersError ? (
              <p>Error loading users: {usersError}</p>
            ) : (
             filteredByEmail.map((user) => (
                <div key={user.id} className="admin-users-card">
                  <p>{user.email}</p>
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="button-transparent"
                    id="admin-users-remove-button"
                  >
                    Remove User
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="admin-container-title">Trainers</h3>
          <div className="admin-container">
            {trainersLoading ? (
              <p>Loading trainers...</p>
            ) : trainersError ? (
              <p>Error loading trainers: {trainersError}</p>
            ) : (
              trainers.map((trainer) => (
                <div key={trainer.uid} className="admin-users-card">
                  <p className="admin-users-card-trainer-name">
                    {trainer.name}
                  </p>
                  <p>{trainer.email}</p>
                  <button
                    className="button-transparent"
                    id="admin-users-remove-button"
                    onClick={() => handleRemoveTrainer(trainer.uid)}
                  >
                    Remove Trainer
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminRemoveUsersAndTrainers;
