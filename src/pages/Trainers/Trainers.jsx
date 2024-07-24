import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import FilterOverlay from "../../components/FilterOverlay/FilterOverlay";
import Search from "../../components/Search/Search";
import { db } from "../../config/firebaseConfig";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import "./Trainers.css";

const Trainers = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [sports, setSports] = useState([]);
  const [levels, setLevels] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [lessonLengths, setLessonLengths] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedLessonLength, setSelectedLessonLength] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 5, max: 100 });
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { answers } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    const initializeFilters = () => {
      if (answers) {
        setSelectedSport(answers[0]);
        setSelectedLevel(answers[1]);
        setSelectedAddress(answers[2]);
        setPriceRange({ min: 5, max: answers[3] });
      }
    };
    initializeFilters();
  }, [answers]);

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
    selectedSport,
    selectedLevel,
    selectedAddress,
    selectedLessonLength,
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
    const loadFavorites = async () => {
      if (user) {
        const favoriteTrainers = await fetchFavorites(user.uid);
        setFavorites(favoriteTrainers);
      }
    };
    loadFavorites();
  }, [user]);

  const isTrainerInFavorites = useCallback(
    (trainerId) => favorites.includes(trainerId),
    [favorites]
  );

  return (
    <>
      {favorites ? (
        <>
          <FilterOverlay
            isVisible={overlayVisible}
            onClose={() => toggleOverlay(false)}
          />
          <section className="trainers-section">
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
                sports={sports}
                levels={levels}
                addresses={addresses}
                lessonLengths={lessonLengths}
                toggleOverlay={toggleOverlay}
              />
              <Search
                onSortByRating={handleSortByRating}
                toggleOverlay={toggleOverlay}
                onSearch={handleSearch}
              />
            </div>
            <section className="team-container">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading &&
                !error &&
                filteredTrainers.map((trainer) => (
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
              {!loading && !error && filteredTrainers.length === 0 && (
                <p>No matches found</p>
              )}
            </section>
            <HomeDivider />
          </section>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};
export default Trainers;

