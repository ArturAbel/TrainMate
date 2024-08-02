import "./HomeCategoriesStrip.css";
import "./HomeCategoriesStrip.tablet.css";

export const HomeCategoriesStrip = ({
  alt = "sport",
  className,
  images,
  text,
}) => {
  return (
    <div className={`home-categories-strip-container ${className}`}>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[0]} alt={alt} />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[1]} alt={alt} />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[2]} alt={alt} />
      </div>
      <span className="home-categories-text">{text}</span>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[3]} alt={alt} />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[4]} alt={alt} />
      </div>
      <div className="home-categories-image-container">
        <img className="home-categories-image" src={images[5]} alt={alt} />
      </div>
    </div>
  );
};
