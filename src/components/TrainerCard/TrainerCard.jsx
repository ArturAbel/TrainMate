import { BiShekel } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

import "./TrainerCard.css";

const Card = () => {
  return (
    <div className="trainer-card-container">
      <div className="trainer-card-image-container">
        <img
          className="trainer-card-image"
          src="https://i.imgur.com/rYTB1zu.jpg"
          alt="image"
        />
      </div>
      <div className="trainer-card-content-container">
        <h1 className="trainer-card-name">avi</h1>
        <span className="trainer-card-sport">basketball</span>
        <p className="trainer-card-level">intermediate</p>
        <p className="trainer-card-location">new york</p>
        <p className="trainer-card-information">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          officia rem ratione voluptates ducimus expedita nemo facere, quasi
          vero ea dolor, assumenda debitis! Quas at vel quam est? Recusandae,
          officiis.
        </p>
      </div>
      <div className="trainer-card-right-content-container">
        <div className="trainer-card-right-data">
          <div className="trainer-card-reviews">
            <GoStarFill className="trainer-card-icon" />7
          </div>
          <div className="trainer-card-price">
            <BiShekel className="trainer-card-icon" />
            90
          </div>
          <CiHeart  className="trainer-card-like" />
        </div>
        <div>
          <button className="button-transparent" id="trainer-card-button">
            book a session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
