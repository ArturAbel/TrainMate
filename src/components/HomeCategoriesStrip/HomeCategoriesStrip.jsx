import "./HomeCategoriesStrip.css";

export const HomeCategoriesStrip = ({ text, className, images }) => {
  return (
    <div className={`home-categories-strip-container ${className}`}>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[0]} alt="sport" />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[1]} alt="sport" />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[2]} alt="sport" />
      </div>
      <span className="home-categories-text">{text}</span>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[3]} alt="sport" />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[4]} alt="sport" />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[5]} alt="sport" />
      </div>
    </div>
  );
};
