// hooks/useFilter.js
import { useState, useEffect } from "react";

const useFilter = (trainers, initialFilters = {}) => {
  const [filteredTrainers, setFilteredTrainers] = useState(trainers);
  const [filters, setFilters] = useState({
    selectedSport: null,
    selectedLevel: null,
    selectedAddress: null,
    selectedLessonLength: null,
    searchQuery: "",
    priceRange: { min: 5, max: 100 },
    ...initialFilters,
  });

  useEffect(() => {
    let filtered = trainers;

    if (filters.selectedSport) {
      filtered = filtered.filter(
        (trainer) => trainer.sport === filters.selectedSport
      );
    }

    if (filters.selectedLevel) {
      filtered = filtered.filter((trainer) =>
        trainer.level.includes(filters.selectedLevel)
      );
    }

    if (filters.selectedAddress) {
      filtered = filtered.filter(
        (trainer) => trainer.address === filters.selectedAddress
      );
    }

    if (filters.selectedLessonLength) {
      filtered = filtered.filter(
        (trainer) => trainer.lessonLength === filters.selectedLessonLength
      );
    }

    if (filters.searchQuery) {
      filtered = filtered.filter((trainer) =>
        trainer.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (trainer) =>
        trainer.price >= filters.priceRange.min &&
        trainer.price <= filters.priceRange.max
    );

    setFilteredTrainers(filtered);
  }, [trainers, filters]);

  const updateFilter = (filterKey, value) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  return { filteredTrainers, updateFilter, filters };
};

export default useFilter;
