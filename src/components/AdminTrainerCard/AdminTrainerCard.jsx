import "./AdminTrainerCard.css";

export const AdminTrainerCard = ({
  lessonLength,
  description,
  imgSrc,
  sport,
  price,
  level,
  about,
  name,
}) => {
  return (
    <div className="admin-trainer-card">
      <div className="admin-trainer-image-container">
        <img className="admin-trainer-image" src={imgSrc} alt="image" />
        <div className="admin-trainer-buttons-container">
          <button className="button-transparent" id="admin-trainer-reject">reject</button>
          <button className="button-transparent" id="admin-trainer-approve">approve</button>
        </div>
      </div>
      <div className="admin-trainer-description">
        <p className="admin-trainer-name">{name}</p>
        <p>{description}</p>
        <p className="admin-trainer-about">{about}</p>
        <p className="admin-trainer-detail">
          <span className="admin-trainer-highlighted">Sport:</span> {sport}
        </p>
        <p className="admin-trainer-detail">
          <span className="admin-trainer-highlighted">Lesson Length:</span>{" "}
          {lessonLength} min
        </p>
        <p className="admin-trainer-detail">
          <span className="admin-trainer-highlighted">Charge:</span> ₪ {price} /
          Per Lesson
        </p>
        <p className="admin-trainer-detail">
          {level.map((level, index) => (
            <span className="admin-trainer-level" key={index}>
              {level}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
