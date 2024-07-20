import { IoArrowForwardSharp } from "react-icons/io5";

import "./ButtonHome.css";

export const ButtonHome = ({ className, text }) => {
  return (
    <button className={`home-button ${className}`}>
      {text}
      <IoArrowForwardSharp className="home-button-arrow" />
    </button>
  );
};
