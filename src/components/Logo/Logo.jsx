import { LOGO } from "../../utilities/constants";

import "./Logo.css";

export const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo-image" src={LOGO} alt="logo" />
      <h2 className="logo-text">train.mate</h2>
    </div>
  );
};
