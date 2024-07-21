import { LoginInput } from "../../components/LoginInput/LoginInput";
import { useFormHook } from "../../hooks/useFormHook";
import { FaGoogle } from "react-icons/fa";

import "./Login.css";

export const Login = () => {
  const { input, handleInputChange } = useFormHook();


  return (
    <section className="login-section">
      <form className="login-form" action="">
        <h4 className="login-form-title">Log in</h4>
        <span className="login-form-text">
          <a className="login-form-link" href="#">
            Sign up as a trainee
          </a>
          <span> or </span>
          <a className="login-form-link" href="#">
            Sign up as a trainer
          </a>
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
    </section>
  );
};
