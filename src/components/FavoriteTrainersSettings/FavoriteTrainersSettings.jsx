import Loader from "../../components/Loader/Loader";

import "./FavoriteTrainersSettings.css";

const FavoriteTrainersSettings = ({
  handleRemoveFavorite,
  trainersError,
  usersLoading,
  trainers,
  userData,
}) => {
  const filteredFavoriteTrainers = trainers.filter((trainer) =>
    userData.favorites.includes(trainer.uid)
  );

  return (
    <div className="favorite-trainers-container">
      <h1 className="favorite-trainers-title">Favorite Trainers</h1>
      <div className="favorite-trainers-grid">
        {usersLoading && <Loader />}
        {trainersError && <p>Error fetching trainers: {trainersError}</p>}
        {!usersLoading && !trainersError && filteredFavoriteTrainers.length > 0
          ? filteredFavoriteTrainers.map((trainer) => (
              <div key={trainer.uid} className="mini-card">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="mini-card-photo"
                />
                <button
                  className="remove-favorite-trainer-button"
                  onClick={(e) => handleRemoveFavorite(e, trainer.uid)}
                >
                  x
                </button>
                <div className="mini-card-info">
                  <h4>{trainer.name}</h4>
                  <p>{trainer.sport}</p>
                </div>
              </div>
            ))
          : !usersLoading && !trainersError && <p>No Favorites Added</p>}
      </div>
    </div>
  );
};

export default FavoriteTrainersSettings;
