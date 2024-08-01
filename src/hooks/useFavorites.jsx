import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const useFavorites = (user) => {
  const [favorites, setFavorites] = useState(() => {
    const initialFavorites = [];
    console.log("Initial favorites state:", initialFavorites);
    return initialFavorites;
  });

  // Function to fetch favorites from Firestore
  const fetchFavorites = async (userId) => {
    const start = performance.now();

    try {
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      const end = performance.now();
      console.log(`Fetch favorites time: ${(end - start).toFixed(2)}ms`);

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

  // Effect to load favorites when the user changes
  useEffect(() => {
    const loadFavorites = async () => {
      const start = performance.now();

      if (user) {
        const favoriteTrainers = await fetchFavorites(user.uid);

        // Delay the state update by 240ms
        setTimeout(() => {
          setFavorites(favoriteTrainers);
          console.log("Fetched favorites:", favoriteTrainers);

          const end = performance.now();
          console.log(
            `Total load favorites time: ${(end - start).toFixed(2)}ms`
          );
        }, 240);
      } else {
        setFavorites([]);
        console.log("User is not logged in, no favorites to fetch");
      }
    };
    loadFavorites();
  }, [user]);

  // Effect to log favorites state on change
  useEffect(() => {
    console.log("Favorites state updated:", favorites);
  }, [favorites]);

  // Function to check if a trainer is in favorites
  const isTrainerInFavorites = (trainerId) => favorites.includes(trainerId);

  return { favorites, isTrainerInFavorites };
};

export default useFavorites;
