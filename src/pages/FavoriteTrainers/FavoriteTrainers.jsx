import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";

import "./css/FavoriteTrainers.css";
import "./css/FavoriteTrainers.tablet.css";
import "./css/FavoriteTrainers.phone.css";

const FavoriteTrainers = () => {
  const dispatch = useDispatch();
  const {
    loading: trainersLoading,
    trainers,
    error,
  } = useSelector((state) => state.trainer);
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && user) {
      const userData = users.find((userObj) => user.uid === userObj.uid);
      const userFavorites = userData?.favorites || [];
      setFavorites(userFavorites);
    }
  }, [user, users]);

  const handleVailerClick = (trainerId) => {
    console.log(`Trainer card with ID ${trainerId} was clicked.`);
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }; // vailer function purpose is just to be  register changes within add and remove and then fetch,  it doesnt render i think because when you update shit, it doesnt trigger re-render

  if (trainersLoading || authLoading || usersLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="favorite-trainers-section">
        <h1 className="favorite-trainers-header-title">
          {user.displayName}, your favorite trainers:
        </h1>
        {error && <p>Error: {error}</p>}
        {favorites.length > 0 ? (
          favorites.map((favoriteTrainerId) => {
            const trainer = trainers.find(
              (trainer) => trainer.uid === favoriteTrainerId
            );
            return trainer ? (
              <TrainerCard
                lessonLength={trainer.lessonLength}
                description={trainer.description}
                ratings={trainer.ratings}
                address={trainer.address}
                reviews={trainer.reviews}
                imgSrc={trainer.image}
                price={trainer.price}
                sport={trainer.sport}
                level={trainer.level}
                about={trainer.about}
                name={trainer.name}
                key={trainer.uid}
                id={trainer.uid}
                favorite={true}
                onVailerClick={handleVailerClick}
              />
            ) : null;
          })
        ) : (
          <section className="favorite-trainers-no-favorite">
            <h1 className="favorite-trainers-no-favorite-title">
              {user.displayName}, you have no favorite trainers!
            </h1>
          </section>
        )}
      </section>
      <HomeDivider />
    </>
  );
};

export default FavoriteTrainers;
