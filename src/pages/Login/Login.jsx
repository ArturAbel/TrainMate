import { LoginInput } from "../../components/LoginInput/LoginInput";
import "./Login.css";

export const Login = () => {
  return (
    <section className="login-section">
      <form
        className="login-form"
        action="
  "
      >
        <h4 className="login-form-title">Log in</h4>
        <p className="login-form-text">
          <a>Sign up as a trainee</a> or <a>Sign up as a trainer</a>
        </p>
        <button className="button-transparent" id="login-google-button">
          Continue with Google
        </button>
        <p className="login-form-text">or</p>
        <LoginInput
          placeholder={"your email"}
          label={"email"}
          name={"email"}
          type={"email"}
        />
        <LoginInput
          placeholder={"your password"}
          label={"password"}
          name={"password"}
          type={"password"}
        />

        <button className="button-transparent" id="login-button">
          Log in
        </button>
        <p className="login-form-text">
          By clicking Log in or Continue with, you agree to TrainMate&apos;s
        </p>
        <p className="login-form-text">and</p>
      </form>
    </section>
  );
};
