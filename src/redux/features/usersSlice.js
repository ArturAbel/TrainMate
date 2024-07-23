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
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
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
  },
});

export const { setUsers, setLoading, setError } = usersSlice.actions;

export const addFavorite = (userId, favoriteItem) => async (dispatch) => {
  dispatch(setLoading(true)); 
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      favorites: arrayUnion(favoriteItem),
    });
    dispatch(setLoading(false)); 
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false)); 
  }
};
export const removeFavorite = (userId, favoriteItemToRemove) => async (dispatch) => {
    dispatch(setLoading(true)); 

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(favoriteItemToRemove), 
      });
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

export default usersSlice.reducer;
