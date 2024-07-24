import { LOGO } from "../../utilities/constants";

import "./Logo.css";

export const Logo = ({ className }) => {
  return (
    <div className={`logo-container`}>
      <img className={`logo-image ${className}`} src={LOGO} alt="logo" />
      <h2 className={`logo-text ${className}`}>train.mate</h2>
    </div>
  );
};
