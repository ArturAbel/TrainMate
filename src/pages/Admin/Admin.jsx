import { AdminTrainerCard } from "../../components/AdminTrainerCard/AdminTrainerCard";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./Admin.css";

const Admin = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  // Assuming you might want to use these states for filtering or other purposes
  const [lessonLengths, setLessonLengths] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sports, setSports] = useState([]);

  return (
    <>
      {!loading && trainers ? (
        <section className="admin-section">
          <h1 className="admin-section-title">New registered train.mates</h1>
          <div className="trainers-filter-search-container"></div>
          <div className="admin-cards-container">
            {trainers.map((trainer) =>
              trainer.approved === false ? (
                <AdminTrainerCard
                  lessonLength={trainer.lessonLength}
                  description={trainer.description}
                  imgSrc={trainer.image}
                  price={trainer.price}
                  sport={trainer.sport}
                  level={trainer.level}
                  about={trainer.about}
                  name={trainer.name}
                  key={trainer.uid}
                  id={trainer.uid}
                />
              ) : null
            )}
          </div>
          <HomeDivider />
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Admin;
