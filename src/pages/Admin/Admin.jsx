import { AdminTrainerCard } from "../../components/AdminTrainerCard/AdminTrainerCard";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";

import "./css/Admin.css";
import "./css/Admin.phone.css";

const Admin = () => {
  const dispatch = useDispatch();
  const {
    loading: trainerLoading,
    trainers,
    error,
  } = useSelector((state) => state.trainer);
  const { loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  return (
    <>
      {trainerLoading || authLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Admin;
