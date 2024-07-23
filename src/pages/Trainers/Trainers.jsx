import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainerFilter } from "../../components/TrainerFilter/TrainerFilter";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import "./Trainers.css";
import { db } from "../../config/firebaseConfig";
import { createSlice } from "@reduxjs/toolkit";
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

const Trainers = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector((state) => state.trainer);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [sports, setSports] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTrainers(trainers);
    const uniqueSports = [...new Set(trainers.map((trainer) => trainer.sport))];
    const uniqueLevels = [...new Set(trainers.map((trainer) => trainer.level))];
    setSports(uniqueSports);
    setLevels(uniqueLevels);
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

    console.log("Filtered trainers:", filtered);

    if (filtered.length === 0) {
      console.log("No matches found");
    }

    setFilteredTrainers(filtered);
  }, [selectedSport, selectedLevel, trainers]);

  const handlePriceFilterChange = (range) => {
    const { min, max } = range;
    const filtered = trainers.filter(
      (trainer) => trainer.price >= min && trainer.price <= max
    );
    console.log("Price range:", range);
    console.log("Filtered trainers by price:", filtered);

    if (filtered.length === 0) {
      console.log("No matches found by price filter");
    }

    setFilteredTrainers(filtered);
  };

  const handleSportFilterChange = (sport) => {
    setSelectedSport(sport);
  };

  const handleLevelFilterChange = (level) => {
    setSelectedLevel(level);
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

  const isTrainerInFavorites = (trainerId) => {
    return favorites.includes(trainerId);
  };

  return (
    <section className="trainers-section">
      <h1 className="trainers-header-title">
        Find your perfect sports trainer with train.mate:
      </h1>
      <TrainerFilter
        onPriceFilterChange={handlePriceFilterChange}
        onSportFilterChange={handleSportFilterChange}
        onLevelFilterChange={handleLevelFilterChange}
        sports={sports}
        levels={levels}
      />
      <section className="team-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          filteredTrainers.map((trainer) => (
            <TrainerCard
              favorite={isTrainerInFavorites(trainer.uid)}
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
              location={trainer.location}
              information={trainer.information}
            />
          ))}
        {!loading && !error && filteredTrainers.length === 0 && (
          <p>No matches found</p>
        )}
      </section>
    </section>
  );
};

export default Trainers;
