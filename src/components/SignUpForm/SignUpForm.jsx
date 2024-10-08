import { refinedFirebaseAuthErrorMessage } from "../../utilities/refineAuthError";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useFormHook } from "../../hooks/useFormHook";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRAINEE, TRAINER } from "../../utilities/constants";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  loginWithGoogle,
  signupTrainer,
  signupUser,
} from "../../redux/features/authSlice";

import "./css/SignUpForm.css";
import "./css/SignUpForm.tablet.css";
import "./css/SignUpForm.phone.css";

export const SignUpForm = ({ title }) => {
  const { error } = useSelector((state) => state.auth);
  const { input, handleInputChange } = useFormHook();
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (title === TRAINEE) {
      dispatch(signupUser(input.email, input.password, input.name));
    }
    if (title === TRAINER) {
      dispatch(signupTrainer(input.email, input.password, input.name));
    }
  };

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    dispatch(loginWithGoogle(title));
  };

  useEffect(() => {
    if (user) {
      console.log("Signed-Up User Data:", user);
      if (user.role === TRAINEE) {
        navigate("/trainers");
      } else if (user.role === TRAINER) {
        navigate("/trainer-registration");
      }
    }
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
    <form className="sign-up-form">
      <h4 className="sign-up-form-title">{`Sign up as a ${title}`}</h4>
      <span className="sign-up-form-text">
        Already have an account?
        <Link to={"/login"} className="sign-up-form-link" href="#">
          Log in
        </Link>
      </span>
      <button
        className="button-transparent"
        onClick={handleGoogleSignUp}
        id="sign-up-google-button"
      >
        <FaGoogle className="sign-up-google-icon" />
        Continue with Google
      </button>
      <p className="sign-up-form-text sign-up-divider">or</p>
      {title === "trainee" ? (
        <LoginInput
          onChange={handleInputChange}
          labelClass={"login-input-label"}
          inputClass={"login-input"}
          placeholder={"Your name"}
          label={"name"}
          name={"name"}
          type={"name"}
        />
      ) : (
        ""
      )}
      <LoginInput
        onChange={handleInputChange}
        labelClass={"login-input-label"}
        inputClass={"login-input"}
        placeholder={"Your email"}
        label={"email"}
        name={"email"}
        type={"email"}
      />
      <LoginInput
        onChange={handleInputChange}
        labelClass={"login-input-label"}
        placeholder={"Your password"}
        inputClass={"login-input"}
        label={"password"}
        name={"password"}
        type={"password"}
      />
      {error ? (
        <p className="sign-up-form-error-message">{errorMessage}</p>
      ) : (
        <p className="sign-up-form-error-message"></p>
      )}
      <button
        className="button-transparent"
        onClick={handleSignUp}
        id="sign-up-button"
      >
        Sign Up
      </button>
      <p className="sign-up-form-policies">
        By clicking Log in or Continue with, you agree to TrainMate&apos;s
        <strong>
          <br />
          <a className="sign-up-form-link" href="#">
            Terms of Use
          </a>
        </strong>
        <span> and </span>
        <strong>
          <a className="sign-up-form-link" href="#">
            Privacy Policy
          </a>
        </strong>
      </p>
    </form>
  );
};
