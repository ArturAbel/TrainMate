import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

import "./SignUp.css";

export const SignUp = ({ title }) => {
  return (
    <section className="sign-up-section">
      <SignUpForm title={title} />
    </section>
  );
};
