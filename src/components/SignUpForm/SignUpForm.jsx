import { loginWithGoogle, signupUser } from "../../redux/features/authSlice";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useFormHook } from "../../hooks/useFormHook";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./SignUpForm.css";

export const SignUpForm = ({ title }) => {
  const { input, handleInputChange } = useFormHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (title === "trainee") {
      dispatch(signupUser(input.email, input.password));
      navigate("/login");
    }
    if (title === "trainer") {
      // Logic for sign up trainer
    }
  };

  const handleGoogleSignUp = () => {
    dispatch(loginWithGoogle());
    navigate("/trainers");
  };

  return (
    <form className="sign-up-form" onSubmit={handleSignUp}>
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
          placeholder={"Your name"}
          label={"name"}
          name={"name"}
          type={"name"}
          required
        />
      ) : (
        ""
      )}
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
      <button className="button-transparent" id="sign-up-button">
        Sign In
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
