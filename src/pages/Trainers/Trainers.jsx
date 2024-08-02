import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import FilterOverlay from "../../components/FilterOverlay/FilterOverlay";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import "./Trainers.css";
import "./Trainers.tablet.css";

const Trainers = () => {
  const dispatch = useDispatch();
  const {
    trainers,
    loading: trainersLoading,
    error,
  } = useSelector((state) => state.trainer);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { loading: usersLoading } = useSelector((state) => state.users);
  const [selectedLessonLength, setSelectedLessonLength] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 5, max: 100 });
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const { answers } = useSelector((state) => state.quiz);
  const [lessonLengths, setLessonLengths] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [sports, setSports] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    const initializeFilters = () => {
      if (answers && answers.length > 0) {
        setSelectedSport(answers[0] || null);
        setSelectedLevel(answers[1] || null);
        setSelectedAddress(answers[2] || null);
        setPriceRange({ min: 5, max: answers[3] || 100 });
      } else {
        setSelectedSport(null);
        setSelectedLevel(null);
        setSelectedAddress(null);
        setPriceRange({ min: 5, max: 100 });
      }
    };
    initializeFilters();
  }, [answers]);

  const fetchFavorites = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        return [];
      } else {
        const userData = userSnap.data();
        return userData.favorites || [];
      }
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      return [];
    }
  };

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

  const handlePriceFilterChange = (range) => {
    setPriceRange(range);
  };

  const handleSportFilterChange = (sport) => {
    setSelectedSport(sport);
  };

  const handleLevelFilterChange = (level) => {
    setSelectedLevel(level);
  };

  const handleAddressFilterChange = (address) => {
    setSelectedAddress(address);
  };

  const handleLessonLengthFilterChange = (lessonLength) => {
    setSelectedLessonLength(lessonLength);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortByRating = () => {
    const sortedTrainers = [...filteredTrainers].sort(
      (a, b) => b.ratings - a.ratings
    );
    setFilteredTrainers(sortedTrainers);
  };

  const toggleOverlay = (visible) => {
    setOverlayVisible(visible);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const favoriteTrainers = await fetchFavorites(user.uid);
        setFavorites(favoriteTrainers);
      } else {
        setFavorites([]);
      }
    };
    loadFavorites();
  }, [user]);

  const isTrainerInFavorites = useCallback(
    (trainerId) => favorites.includes(trainerId),
    [favorites]
  );

  const isLoading = usersLoading || authLoading;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="trainers-section">
          <FilterOverlay
            isVisible={overlayVisible}
            onClose={() => toggleOverlay(false)}
          />
          <h1 className="trainers-header-title">
            Find Your Perfect Sports Trainer with trainMate:
          </h1>
          <div className="trainers-filter-search-container">
            <TrainerFilter
              onLessonLengthFilterChange={handleLessonLengthFilterChange}
              onAddressFilterChange={handleAddressFilterChange}
              onPriceFilterChange={handlePriceFilterChange}
              onSportFilterChange={handleSportFilterChange}
              onLevelFilterChange={handleLevelFilterChange}
              toggleOverlay={toggleOverlay}
              lessonLengths={lessonLengths}
              addresses={addresses}
              sports={sports}
              levels={levels}
            />
            <Search
              onSortByRating={handleSortByRating}
              toggleOverlay={toggleOverlay}
              onSearch={handleSearch}
            />
          </div>
          <section className="team-container">
            {error && <p>Error: {error}</p>}
            {filteredTrainers.map((trainer) => (
              <TrainerCard
                favorite={isTrainerInFavorites(trainer.uid)}
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
              />
            ))}
            {filteredTrainers.length === 0 && !error && (
              <div className="trainers-no-matches-found">no matches found</div>
            )}
          </section>
          <HomeDivider />
        </section>
      )}
    </>
  );
};

export default Trainers;
