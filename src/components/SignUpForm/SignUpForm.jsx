import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useFormHook } from "../../hooks/useFormHook";
import { FaGoogle } from "react-icons/fa";

import "./SignUpForm.css";
import { Link } from "react-router-dom";

export const SignUpForm = ({ title }) => {
  const { input, handleInputChange } = useFormHook();

  return (
    <form className="sign-up-form" action="">
      <h4 className="sign-up-form-title">{`Sign up as a ${title}`}</h4>
      <span className="sign-up-form-text">
        Already have an account?
        <Link to={"/login"} className="sign-up-form-link" href="#">
          Log in
        </Link>
      </span>
      <button className="button-transparent" id="sign-up-google-button">
        <FaGoogle className="sign-up-google-icon" />
        Continue with Google
      </button>
      <p className="sign-up-form-text sign-up-divider">or</p>
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
