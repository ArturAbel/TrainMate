import "./HomeCategoriesStrip.css";

export const HomeCategoriesStrip = ({ text, className }) => {
  return (
    <div className={`home-categories-strip-container ${className}`}>
      <div className="home-categories-image-container">
        <img src="" alt="" />
      </div>
      <div className="home-categories-image-container"></div>
      <div className="test"></div>
      <div className="home-categories-image-container"></div>

      <span className="home-categories-text">{text}</span>
      <div className="home-categories-image-container"></div>
      <div className="home-categories-image-container"></div>
      <div className="home-categories-image-container"></div>
    </div>
  );
};
