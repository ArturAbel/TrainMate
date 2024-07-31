import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const fetchFavorites = async (userId) => {
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
