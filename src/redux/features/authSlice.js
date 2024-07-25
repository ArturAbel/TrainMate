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

const serializeUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

// User
const createUserDoc = async (user, userName) => {
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(
    userDocRef,
    {
      uid: user.uid,
      phone: "",
      age: "",
      email: user.email,
      displayName: user.displayName || userName || "unknown",
      photoURL: user.photoURL || "/person1.jpg",
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

// trainer
const createTrainerDoc = async (user, userName) => {
  const trainerDocRef = doc(db, "trainers", user.uid);
  await setDoc(
    trainerDocRef,
    {
      name: user.displayName || userName || " ",
      image: user.photoURL || "/person1.jpg",
      createdAt: new Date(),
      email: user.email,
      uid: user.uid,
      sport: "",
      reviews: [],
      ratings: 0,
      price: "",
      level: [],
      lessonLength: "",
      description: "",
      about: "",
      address: "",
      availableSchedule: {},
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
      dispatch(setUser(serializeUser(user)));
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
      dispatch(setUser(serializeUser(userCredential.user)));
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
    dispatch(setUser(serializeUser(userCredential.user)));
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
    dispatch(setUser(serializeUser(userCredential.user)));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error logging in:", error);
  }
};

// Log in with trainer google account
export const loginWithTrainerGoogle = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    const trainerDocRef = doc(db, "trainers", result.user.uid);
    const userDoc = await getDoc(trainerDocRef);
    if (!userDoc.exists()) {
      await createTrainerDoc(result.user);
    }
    dispatch(setUser(serializeUser(result.user)));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error logging in with Google:", error);
  }
};

// Log in with user google account
export const loginWithGoogle = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    const userDocRef = doc(db, "users", result.user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await createUserDoc(result.user);
    }
    dispatch(setUser(serializeUser(result.user)));
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
