import { refinedFirebaseAuthErrorMessage } from "../../utilities/refineAuthError";
import { loginUser, loginWithGoogle } from "../../redux/features/authSlice";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormHook } from "../../hooks/useFormHook";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { db } from "../../config/firebaseConfig";

import { doc, getDoc } from "firebase/firestore";
import "./LoginForm.css";

export const LoginForm = () => {
  const { user, error } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState();
  const { input, handleInputChange } = useFormHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(input.email, input.password));
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithGoogle("trainee"));
  };

  useEffect(() => {
    if (!user) return;

    const trainerDocRef = doc(db, "trainers", user.uid);
    getDoc(trainerDocRef)
      .then((snapshot) => {
        const TrainerSnap = snapshot;
        const trainerApproved =
          TrainerSnap.exists() && TrainerSnap.data().approved;

        let path;
        if (trainerApproved) {
          path = `/trainer-panel/${user.uid}`;
        } else if (user.role === "admin") {
          path = `/admin`;
        } else if (user.role === "trainee") {
          path = "/trainers";
        } else {
          path = "/pending-trainer";
        }

        navigate(path);
      })
      .catch((error) => {
        console.error("the fallowing error occured:", error);
      });
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      const refinedError = refinedFirebaseAuthErrorMessage(error);
      setErrorMessage(refinedError);
    }
  }, [error]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <form className="login-form">
      <h4 className="login-form-title">Log in</h4>
      <span className="login-form-text">
        <Link to={"/sign-up-trainee"} className="login-form-link" href="#">
          Sign up as a trainee
        </Link>
        <span> or </span>
        <Link to={"/sign-up-trainer"} className="login-form-link" href="#">
          Sign up as a trainer
        </Link>
      </span>
      <button
        className="button-transparent"
        onClick={handleGoogleLogin}
        id="login-google-button"
      >
        <FaGoogle className="login-google-icon" />
        Continue with Google
      </button>
      <p className="login-form-text login-divider">or</p>
      <LoginInput
        onChange={handleInputChange}
        labelClass={"login-input-label"}
        inputClass={"login-input"}
        placeholder={"Your email"}
        label={"email"}
        name={"email"}
        type={"email"}
        required
      />
      <LoginInput
        onChange={handleInputChange}
        labelClass={"login-input-label"}
        placeholder={"Your password"}
        inputClass={"login-input"}
        label={"password"}
        name={"password"}
        type={"password"}
        required
      />
      {error ? (
        <p className="login-form-error-message">{errorMessage}</p>
      ) : (
        <p className="login-form-error-message"></p>
      )}
      <button
        className="button-transparent"
        onClick={handleUserLogin}
        id="login-button"
      >
        Log in
      </button>
      <p className="login-form-policies">
        By clicking Log in or Continue with, you agree to TrainMate&apos;s
        <strong>
          <br />
          <a className="login-form-link" href="#">
            Terms of Use
          </a>
        </strong>
        <span> and </span>
        <strong>
          <a className="login-form-link" href="#">
            Privacy Policy
          </a>
        </strong>
      </p>
    </form>
  );
};
