import { IoArrowForwardSharp } from "react-icons/io5";

import "./ButtonHome.css";

export const ButtonHome = ({ className }) => {
  return (
    <button className={`home-button ${className}`}>
      get started
      <IoArrowForwardSharp className="home-button-arrow" />
    </button>
  );
};
