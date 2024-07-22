import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import TrainerCard from "../../components/TrainerCard/TrainerCard";

import "./Trainers.css";

const Trainers = () => {
  return (
    <section className="trainers-section">
      <h1 className="trainers-header-title">
        Find Your Perfect Sports Trainer with trainMate:
      </h1>
      <TrainerFilter />
      <section className="team-container">
        <TrainerCard
          imgSrc="trainer-photo.jpg"
          experience="5 years"
          expertise="English"
          name="Trainer Name"
          reviews="4.5"
          price="50"
        />
        {/* Add more Card components as needed */}
      </section>
    </section>
  );
};

export default Trainers;
