import { createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  deleteUser as deleteAuthUser,
} from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { anonymousImage } from "../../utilities/constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

const serializeUser = (user, role = "") => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  role,
});

// User
const createUserDoc = async (user, userName) => {
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(
    userDocRef,
    {
      uid: user.uid,
      phone: "",
      gender: "",
      age: "",
      email: user.email,
      displayName: user.displayName || userName || "unknown",
      photoURL: user.photoURL || anonymousImage,
      createdAt: new Date(),
      bookedLessons: [],
      filtersRef: [],
      favorites: [],
      transactions: [],
      wallet: 0,
    },
    { merge: true }
  );
};

// Trainer
const createTrainerDoc = async (user, userName) => {
  const trainerDocRef = doc(db, "trainers", user.uid);

  const defaultSchedule = {};
  const now = new Date();
  console.log(now);

  // Adjust the end date to be one day past the last day of the month to ensure inclusivity
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  console.log(endOfMonth);

  const formatDate = (date) => date.toISOString().split("T")[0];

  // Adjust the loop to ensure the end date is inclusive
  for (let date = new Date(now); date < endOfMonth; date.setDate(date.getDate() + 1)) {
    if (date.getDay() !== 5 && date.getDay() !== 6) { // Exclude Fridays and Saturdays
      const formattedDate = formatDate(date);
      console.log(formattedDate);
      const hours = [];
      const isToday = date.toDateString() === now.toDateString();

      for (let i = 10; i <= 18; i += 2) {
        const hourDate = new Date(date);
        hourDate.setHours(i, 0, 0, 0);

        if (!isToday || (isToday && hourDate > now)) {
          const hour = i < 12 ? `${i}:00 AM` : `${i === 12 ? 12 : i - 12}:00 PM`;
          hours.push(hour);
        }
      }

      if (hours.length > 0) {
        defaultSchedule[formattedDate] = hours;
      }
    }
  }

  await setDoc(
    trainerDocRef,
    {
      name: user.displayName || userName || " ",
      image: user.photoURL || anonymousImage,
      createdAt: new Date(),
      email: user.email,
      uid: user.uid,
      gender: "",
      sport: "",
      reviews: [],
      ratings: [],
      price: "",
      level: [],
      lessonLength: "",
      description: "",
      about: "",
      address: "",
      availableSchedule: defaultSchedule,
      bookedLessons: [],
      approved: false,
    },
    { merge: true }
  );
};




export const initializeAuthListener = () => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const trainerDocRef = doc(db, "trainers", user.uid);
      const trainerDoc = await getDoc(trainerDocRef);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userRole = "";
      if (user.email === "admin123@gmail.com") {
        userRole = "admin";
      } else if (trainerDoc.exists()) {
        userRole = "trainer";
      } else if (userDoc.exists()) {
        userRole = "trainee";
      }

      dispatch(setUser(serializeUser(user, userRole)));
    } else {
      await signOut(auth);
      dispatch(setUser(null));
      dispatch(setError("User data not found. Please contact support."));
    }
    dispatch(setLoading(false));
  });
};

// Sign up trainer
export const signupTrainer =
  (email, password, userName) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createTrainerDoc(userCredential.user, userName);
      const serializedUser = serializeUser(userCredential.user, "trainer");
      dispatch(setUser(serializedUser));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.error("Error signing up:", error);
    }
  };

// Sign up user
export const signupUser = (email, password, userName) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserDoc(userCredential.user, userName);
    const serializedUser = serializeUser(userCredential.user, "trainee");
    dispatch(setUser(serializedUser));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error signing up:", error);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const trainerDocRef = doc(db, "trainers", userCredential.user.uid);
    const trainerDoc = await getDoc(trainerDocRef);

    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);

    let userRole = "";
    if (email === "admin123@gmail.com") {
      userRole = "admin";
    } else if (trainerDoc.exists()) {
      userRole = "trainer";
    } else if (userDoc.exists()) {
      userRole = "trainee";
    }

    dispatch(
      setUser({ ...serializeUser(userCredential.user), role: userRole })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error logging in:", error);
  }
};

// Log in with Google
export const loginWithGoogle = (usertype) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);

    const trainerDocRef = doc(db, "trainers", result.user.uid);
    const trainerDoc = await getDoc(trainerDocRef);

    const userDocRef = doc(db, "users", result.user.uid);
    const userDoc = await getDoc(userDocRef);

    let userRole = "";
    if (trainerDoc.exists() || userDoc.exists()) {
      if (trainerDoc.exists()) {
        userRole = "trainer";
      } else if (userDoc.exists()) {
        userRole = "trainee";
      }
    } else {
      if (usertype === "trainee") {
        await createUserDoc(result.user);
        userRole = "trainee";
      }
      if (usertype === "trainer") {
        await createTrainerDoc(result.user);
        userRole = "trainer";
      }
    }

    dispatch(setUser({ ...serializeUser(result.user), role: userRole }));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error logging in with Google:", error);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(setUser(null));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error logging out:", error);
  }
};

export const deleteUserAccount = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = auth.currentUser;
    if (user) {
      await deleteAuthUser(user);
      dispatch(setUser(null));
      dispatch(setLoading(false));
    }
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error deleting user:", error);
  }
};

export default authSlice.reducer;
