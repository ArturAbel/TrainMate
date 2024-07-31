import FilterOverlay from "../../components/FilterOverlay/FilterOverlay";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./FavoriteTrainers.css";

const FavoriteTrainers = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const [selectedLessonLength, setSelectedLessonLength] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 5, max: 100 });
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [lessonLengths, setLessonLengths] = useState([]);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [sports, setSports] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTrainers(trainers);
    const uniqueSports = [...new Set(trainers.map((trainer) => trainer.sport))];
    const uniqueLevels = [...new Set(trainers.map((trainer) => trainer.level))];
    const uniqueAddresses = [
      ...new Set(trainers.map((trainer) => trainer.address)),
    ];
    const uniqueLessonLengths = [
      ...new Set(trainers.map((trainer) => trainer.lessonLength)),
    ];
    setSports(uniqueSports);
    setLevels(uniqueLevels);
    setAddresses(uniqueAddresses);
    setLessonLengths(uniqueLessonLengths);
  }, [trainers]);

  useEffect(() => {
    let filtered = trainers;

    if (selectedSport) {
      filtered = filtered.filter((trainer) => trainer.sport === selectedSport);
    }

    if (selectedLevel) {
      filtered = filtered.filter((trainer) =>
        trainer.level.includes(selectedLevel)
      );
    }

    if (selectedAddress) {
      filtered = filtered.filter(
        (trainer) => trainer.address === selectedAddress
      );
    }

    if (selectedLessonLength) {
      filtered = filtered.filter(
        (trainer) => trainer.lessonLength === selectedLessonLength
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((trainer) =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (trainer) =>
        trainer.price >= priceRange.min && trainer.price <= priceRange.max
    );

    setFilteredTrainers(filtered);
  }, [
    selectedLessonLength,
    selectedAddress,
    selectedSport,
    selectedLevel,
    searchQuery,
    priceRange,
    trainers,
  ]);

  const toggleOverlay = (visible) => {
    setOverlayVisible(visible);
  };

  useEffect(() => {
    if (users && user) {
      const userData = users.find((userObj) => user.uid === userObj.uid);
      const favorites = userData?.favorites || [];
      setFavorites(favorites);
    }
  }, [user, users]);

  return (
    <>
      {favorites ? (
        <>
          <FilterOverlay
            onClose={() => toggleOverlay(false)}
            isVisible={overlayVisible}
          />
          <section className="favorite-trainers-section">
            <h1 className="favorite-trainers-header-title">
              {user.displayName}, your favorite trainers:
            </h1>
            {loading && <p>Loading...</p>}
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
                  />
                ) : null;
              })
            ) : (
              <section className="favorite-trainers-no-favorite">
                <h1 className="favorite-trainers-no-favorite-title">
                  {user.displayName}, you have no favorite trainers yet!
                </h1>
              </section>
            )}
          </section>
          <HomeDivider />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default FavoriteTrainers;
