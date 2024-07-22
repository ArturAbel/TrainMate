import { loginUser, loginWithGoogle } from "../../redux/features/authSlice";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormHook } from "../../hooks/useFormHook";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import "./LoginForm.css";
import { useEffect } from "react";
import { refinedFirebaseAuthErrorMessage } from "../../utilities/refineAuthError";

export const LoginForm = () => {
  const { user, loading, error, setError } = useSelector((state) => state.auth);

  const { input, handleInputChange } = useFormHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(input.email, input.password));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  useEffect(() => {
    if (user) {
      navigate("/trainers");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      console.log(`here`);
      setTimeout(() => dispatch(setError(null)), 2000);
    }
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="login-form" onSubmit={handleUserLogin}>
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
            placeholder={"Your email"}
            label={"email"}
            name={"email"}
            type={"email"}
            required
          />
          <LoginInput
            onChange={handleInputChange}
            placeholder={"Your password"}
            label={"password"}
            name={"password"}
            type={"password"}
            required
          />
          {error ? (
            <p className="login-form-error-message">
              {refinedFirebaseAuthErrorMessage(error)}
            </p>
          ) : (
            <p className="login-form-error-message"></p>
          )}
          <button className="button-transparent" id="login-button">
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
      )}
    </>
  );
};
