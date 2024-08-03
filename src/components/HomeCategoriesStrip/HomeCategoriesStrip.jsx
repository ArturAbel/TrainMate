import { ALT_IMAGE } from "../../utilities/constants";

import "./css/HomeCategoriesStrip.css";
import "./css/HomeCategoriesStrip.tablet.css";
import "./css/HomeCategoriesStrip.phone.css";

export const HomeCategoriesStrip = ({ className, images, text }) => {
  return (
    <div className={`home-categories-strip-container ${className}`}>
      <div className="home-categories-image-container">
        <img
          className="home-categories-image"
          src={images[0]}
          alt={ALT_IMAGE}
        />
      </div>
      <div className="home-categories-image-container">
        <img
          className="home-categories-image"
          src={images[1]}
          alt={ALT_IMAGE}
        />
      </div>
      <div className="home-categories-image-container">
        <img
          className="home-categories-image"
          src={images[2]}
          alt={ALT_IMAGE}
        />
      </div>
      <span className="home-categories-text">{text}</span>
      <div className="home-categories-image-container">
        <img
          className="home-categories-image"
          src={images[3]}
          alt={ALT_IMAGE}
        />
      </div>
      <div className="home-categories-image-container">
        <img
          className="home-categories-image"
          src={images[4]}
          alt={ALT_IMAGE}
        />
      </div>
      <div className="home-categories-image-container">
        <img
          className="home-categories-image"
          src={images[5]}
          alt={ALT_IMAGE}
        />
      </div>
    </div>
  );
};
