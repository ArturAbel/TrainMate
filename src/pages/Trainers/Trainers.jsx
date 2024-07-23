import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import FilterOverlay from "../../components/FilterOverlay/FilterOverlay.jsx";
import Search from "../../components/Search/Search";
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

  useEffect(() => {
    dispatch(fetchTrainers());
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
      console.log("After sport filter:", filtered);
    }

    if (selectedLevel) {
      filtered = filtered.filter((trainer) => trainer.level === selectedLevel);
      console.log("After level filter:", filtered);
    }

    if (selectedAddress) {
      filtered = filtered.filter(
        (trainer) => trainer.address === selectedAddress
      );
      console.log("After address filter:", filtered);
    }

    if (selectedLessonLength) {
      filtered = filtered.filter(
        (trainer) => trainer.lessonLength === selectedLessonLength
      );
      console.log("After session duration filter:", filtered);
    }

    if (searchQuery) {
      filtered = filtered.filter((trainer) =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("After search filter:", filtered);
    }

    filtered = filtered.filter(
      (trainer) =>
        trainer.price >= priceRange.min && trainer.price <= priceRange.max
    );
    console.log("After price filter:", filtered);

    console.log("Filtered trainers:", filtered);

    if (filtered.length === 0) {
      console.log("No matches found");
    }

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

  const toggleOverlay = (visible) => {
    setOverlayVisible(visible);
  };

  return (
    <>
      <FilterOverlay
        isVisible={overlayVisible}
        onClose={() => toggleOverlay(false)}
      />
      <section className="trainers-section">
        <h1 className="trainers-header-title">
          Find Your Perfect Sports Trainer with trainMate:
        </h1>
        <TrainerFilter
          onPriceFilterChange={handlePriceFilterChange}
          onSportFilterChange={handleSportFilterChange}
          onLevelFilterChange={handleLevelFilterChange}
          onAddressFilterChange={handleAddressFilterChange}
          onLessonLengthFilterChange={handleLessonLengthFilterChange}
          sports={sports}
          levels={levels}
          addresses={addresses}
          lessonLengths={lessonLengths}
          toggleOverlay={toggleOverlay}
        />
        <Search onSearch={handleSearch} />
        <section className="team-container">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading &&
            !error &&
            filteredTrainers.map((trainer) => (
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
                address={trainer.address}
                lessonLength={trainer.lessonLength}
                information={trainer.information}
              />
            ))}
          {!loading && !error && filteredTrainers.length === 0 && (
            <p>No matches found</p>
          )}
        </section>
      </section>
    </>
  );
};

export default Trainers;
