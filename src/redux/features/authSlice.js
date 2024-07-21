import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; //*todo - we need to import form the config that nahum is working on 

const authSlice = createSlice({
  name: 'auth',
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

export const initializeAuthListener = () => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
    dispatch(setLoading(false));
  });
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    dispatch(setUser(result.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const signupUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
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
  }
};

export default authSlice.reducer;



