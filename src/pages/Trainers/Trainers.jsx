import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import "./Trainers.css";

const Trainers = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  
  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  return (
    <section className="trainers-section">
      <h1 className="trainers-header-title">
        Find Your Perfect Sports Trainer with trainMate:
      </h1>
      <TrainerFilter />
      <section className="team-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          trainers.map((trainer) => (
            <TrainerCard
              key={trainer.uid}
              id={trainer.uid}
              imgSrc={trainer.imgSrc || "https://i.imgur.com/rYTB1zu.jpg"}
              experience={trainer.experience}
              expertise={trainer.expertise}
              name={trainer.name}
              reviews={trainer.reviews}
              price={trainer.price}
              sport={trainer.sport}
              level={trainer.level}
              location={trainer.location}
              information={trainer.information}
            />
          ))}
      </section>
    </section>
  );
};

export default Trainers;
