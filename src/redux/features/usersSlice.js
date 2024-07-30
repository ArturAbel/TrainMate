import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebaseConfig";
import { createSlice } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  updateDoc,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    favoriteCount: 0,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    increaseFavoriteCount: (state) => {
      state.favoriteCount += 1;
    },
    decreaseFavoriteCount: (state) => {
      state.favoriteCount -= 1;
    },
    resetFavoriteCount: (state) => {
      state.favoriteCount = 0;
    },
  },
});

export const {
  decreaseFavoriteCount,
  increaseFavoriteCount,
  resetFavoriteCount,
  favoriteCount,
  setLoading,
  setUsers,
  setError,
} = usersSlice.actions;

export const addFavorite = (userId, favoriteItem) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      favorites: arrayUnion(favoriteItem),
    });
    dispatch(increaseFavoriteCount());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const removeFavorite =
  (userId, favoriteItemToRemove) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(favoriteItemToRemove),
      });
      dispatch(decreaseFavoriteCount());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setUsers(users));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const addUser = (userId, password, email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await addDoc(collection(db, "users"), { userId, password, email });
    dispatch(fetchUsers());
    dispatch(setLoading(false));
    alert("User added successfully");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error adding user:", error);
    alert("Error adding user: " + error.message);
  }
};

export const updateUser = (userId, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await setDoc(doc(db, "users", userId), updatedData, { merge: true });
    dispatch(fetchUsers());
    dispatch(setLoading(false));
    alert("User updated successfully");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error updating user:", error);
    alert("Error updating user: " + error.message);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteDoc(doc(db, "users", userId));
    dispatch(fetchUsers());
    dispatch(setLoading(false));
    alert("User deleted successfully");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error deleting user:", error);
    alert("Error deleting user: " + error.message);
  }
};

export const uploadUserProfileImage = (file, userId) => async (dispatch) => {
  dispatch(setLoading(true));
  const storageRef = ref(storage, `users/${userId}/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "users", userId), { photoURL: downloadURL });
    dispatch(fetchUsers());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error uploading image:", error);
    alert("Error uploading image: " + error.message);
  }
};

export const bookLesson =
  (trainerId, userId, booking, userName, userImage) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const trainerRef = doc(db, "trainers", trainerId);
      const userRef = doc(db, "users", userId);

      await updateDoc(trainerRef, {
        bookedLessons: arrayUnion({
          ...booking,
          userId: userId,
          userName: userName,
          userImage: userImage,
        }),
      });

      await updateDoc(userRef, {
        bookedLessons: arrayUnion({ ...booking, trainerId: trainerId }),
      });

      dispatch(setLoading(false));
      alert("Lesson booked successfully!");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      alert("Error booking lesson: " + error.message);
    }
  };

export const upsertReview = async (userId, trainerId, starRating, comment) => {
  try {
    // Step 1: Check User Eligibility
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User not found");
      return; 
    }

    const userData = userSnap.data();
    const bookedLessons = userData.userHistory || [];

    // Check if the user has at least one lesson with the trainer
    const hasLessonWithTrainer = bookedLessons.some(
      (lesson) => lesson.trainerId === trainerId
    );

    if (!hasLessonWithTrainer) {
      console.log(
        "User must have at least one lesson with the trainer to leave a review"
      );
      return; // Exit function early
    }

    // Prepare review data
    const reviewData = {
      userId,
      starRating,
      comment,
      createdAt: new Date(),
    };

    // Fetch the trainer document to check for an existing review
    const trainerRef = doc(db, "trainers", trainerId);
    const trainerSnap = await getDoc(trainerRef);

    if (!trainerSnap.exists()) {
      console.log("Trainer not found");
      return; // Exit function early
    }

    let reviews = trainerSnap.data().reviews || [];

    // Check for an existing review by the same user
    const existingReviewIndex = reviews.findIndex(
      (review) => review.userId === userId
    );

    if (existingReviewIndex !== -1) {
      // Remove the existing review from the array
      
      await updateDoc(trainerRef, {
        reviews: arrayRemove(reviews[existingReviewIndex]), // Remove the old review
      });
    }

    // Add the new review to the array
    await updateDoc(trainerRef, {
      reviews: arrayUnion(reviewData), // Add the new review
    });

    console.log("Review operation completed successfully");
  } catch (error) {
    console.error("Error upserting review:", error);
  }
};

export const deleteReviewById = async (trainerId, userId) => {
  try {
    const trainerRef = doc(db, "trainers", trainerId);
    const trainerSnap = await getDoc(trainerRef);

    if (!trainerSnap.exists()) {
      console.log("Trainer not found");
      return; // Exit function early
    }

    const trainerData = trainerSnap.data();
    let reviews = trainerData.reviews || [];

    // Find the review by userId and remove it
    reviews = reviews.filter((review) => review.userId !== userId);

    // Update the trainer document with the modified reviews array
    await updateDoc(trainerRef, {
      reviews: reviews,
    });

    console.log("Review deleted successfully");
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

export default usersSlice.reducer;
