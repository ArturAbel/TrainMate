import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useFormHook } from "../../hooks/useFormHook";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./LoginForm.css";

export const LoginForm = () => {
  const { input, handleInputChange } = useFormHook();

  return (
    <form className="login-form" action="">
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
      <button className="button-transparent" id="login-google-button">
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
      />
      <LoginInput
        onChange={handleInputChange}
        placeholder={"Your password"}
        label={"password"}
        name={"password"}
        type={"password"}
      />
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
  );
};
