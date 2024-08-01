import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTrainerData from "../../hooks/useTrainerData";
import useFilter from "../../hooks/useFilter";
import useFavorites from "../../hooks/useFavorites";
import TrainerFilter from "../../components/TrainerFilter/TrainerFilter";
import FilterOverlay from "../../components/FilterOverlay/FilterOverlay";
import Search from "../../components/Search/Search";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { fetchTrainers } from "../../redux/features/trainerSlice";

import "./Trainers.css";

const Trainers = () => {
  const { trainers, loading, error, sports, levels, addresses, lessonLengths } =
    useTrainerData();
  const { filteredTrainers, updateFilter } = useFilter(trainers);
  const { favorites, isTrainerInFavorites } = useFavorites(
    useSelector((state) => state.auth.user)
  );
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { answers } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const memoizedUpdateFilter = useCallback(updateFilter, []);

  useEffect(() => {
    const initializeFilters = () => {
      if (answers && answers.length > 0) {
        memoizedUpdateFilter("selectedSport", answers[0] || null);
        memoizedUpdateFilter("selectedLevel", answers[1] || null);
        memoizedUpdateFilter("selectedAddress", answers[2] || null);
        memoizedUpdateFilter("priceRange", { min: 5, max: answers[3] || 100 });
      } else {
        memoizedUpdateFilter("selectedSport", null);
        memoizedUpdateFilter("selectedLevel", null);
        memoizedUpdateFilter("selectedAddress", null);
        memoizedUpdateFilter("priceRange", { min: 5, max: 100 });
      }
    };
    initializeFilters();
  }, [answers, memoizedUpdateFilter]);

  const handleSearch = (query) => {
    memoizedUpdateFilter("searchQuery", query);
  };

  const handleSortByRating = () => {
    const sortedTrainers = [...filteredTrainers].sort(
      (a, b) => b.ratings - a.ratings
    );
    memoizedUpdateFilter("sortedTrainers", sortedTrainers);
  };

  const toggleOverlay = (visible) => {
    setOverlayVisible(visible);
  };

  return (
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
          onLessonLengthFilterChange={(length) =>
            memoizedUpdateFilter("selectedLessonLength", length)
          }
          onAddressFilterChange={(address) =>
            memoizedUpdateFilter("selectedAddress", address)
          }
          onPriceFilterChange={(range) =>
            memoizedUpdateFilter("priceRange", range)
          }
          onSportFilterChange={(sport) =>
            memoizedUpdateFilter("selectedSport", sport)
          }
          onLevelFilterChange={(level) =>
            memoizedUpdateFilter("selectedLevel", level)
          }
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
      <div className="team-container">
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
          <div className="trainers-no-matches-found">no matches found</div>
        )}
      </div>
      <HomeDivider />
    </section>
  );
};

export default Trainers;
