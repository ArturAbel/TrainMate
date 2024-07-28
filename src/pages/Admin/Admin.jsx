import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import FilterOverlay from "../../components/FilterOverlay/FilterOverlay";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import { db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

import "./Admin.css";

const Admin = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    console.log(trainers, "those are trainers");
  }, [trainers]);

  // Assuming you might want to use these states for filtering or other purposes
  const [sports, setSports] = useState([]);
  const [levels, setLevels] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [lessonLengths, setLessonLengths] = useState([]);

  return (
    <>
      {!loading && trainers ? (
        <section className="trainers-section">
          <h1 className="trainers-header-title">Admin - Manage Trainers:</h1>
          <div className="trainers-filter-search-container"></div>
          <section className="team-container"></section>
          <HomeDivider />
          {trainers.map((trainer) =>
            trainer.approved === false ? (
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
                inAdmin={true}
              />
            ) : null
          )}
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Admin;
