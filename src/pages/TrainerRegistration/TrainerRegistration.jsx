import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { sports } from "../../utilities/constants";

import "./TrainerRegistration.css";
import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import { uploadUserProfileImage } from "../../redux/features/usersSlice";
import { useDispatch } from "react-redux";

export const TrainerRegistration = () => {
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // if (file) {
    //   useDispatch(uploadUserProfileImage(file, ));
    // }
  };

  //  const profileImageUrl = userData.photoURL ||
  //  (user.providerData && user.providerData.length > 0 && user.providerData[0].providerId === 'google.com' ? user.photoURL : '/public/person1.jpg');

  return (
    <section className="trainer-registration-section">
      <div className="trainer-registration-instructions-container">
        <div>
          <h1 className="trainer-registration-instructions-title">
            instructions
          </h1>
          <p className="trainer-registration-instructions-explanation">
            explanation about the process
          </p>
        </div>
        <div className="trainer-registration-instructions-dos">
          <BsHandThumbsUp />
          dos
        </div>
        <div className="trainer-registration-instructions-dos">
          <BsHandThumbsDown />
          dont&apos;s
        </div>
      </div>

      <div className="trainer-registration-form-container">
        <form action="" className="trainer-registration-form">
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              choose your sport
            </label>
            <select className="trainer-registration-form-input" name="sport">
              {sports.map((sport, index) => (
                <option
                  className="trainer-registration-form-option"
                  value={sport}
                  key={index}
                >
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* Divide to component  1*/}
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              add your full name
            </label>
            <input
              type="name"
              className="trainer-registration-form-input"
              placeholder="ex: avi israeli"
            />
          </div>
          {/* 2 */}
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              provide a short description
            </label>
            <input
              type="name"
              className="trainer-registration-form-input form-input-longer"
              placeholder="ex: aerobics coach with a focus on youth development."
            />
          </div>

          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              write about yourself
            </label>
            <textarea
              type="name"
              className="trainer-registration-form-input form-textarea"
              placeholder="ex: I have been training youth for over 3 years.  My focus is  on building foundational skills and instilling a well... My qualifications are.... "
            />
          </div>

          {/* 3 */}
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              your address
            </label>
            <input
              type="name"
              className="trainer-registration-form-input"
              placeholder="ex: tel aviv"
            />
          </div>

          <div className="trainer-registration-input-container">
            <label htmlFor="" className="trainer-registration-form-label">
              Which levels do you teach
            </label>

            {/* Make checkbox component */}
            <div className="trainer-registration-input-container-level">
              <div className="trainer-registration-level-container">
                <label className="trainer-registration-form-level-label">
                  Beginner
                </label>
                <input
                  type="checkbox"
                  className="trainer-registration-form-input-checkbox"
                />
              </div>

              <div className="trainer-registration-level-container">
                <label className="trainer-registration-form-level-label">
                  Intermediate
                </label>
                <input
                  type="checkbox"
                  className="trainer-registration-form-input-checkbox"
                />
              </div>

              <div className="trainer-registration-level-container">
                <label className="trainer-registration-form-level-label">
                  Advanced
                </label>
                <input
                  type="checkbox"
                  className="trainer-registration-form-input-checkbox"
                />
              </div>

              <div className="trainer-registration-level-container">
                <label className="trainer-registration-form-level-label">
                  Expert
                </label>
                <input
                  type="checkbox"
                  className="trainer-registration-form-input-checkbox"
                />
              </div>

              <div className="trainer-registration-level-container">
                <label className="trainer-registration-form-level-label">
                  Master
                </label>
                <input
                  type="checkbox"
                  className="trainer-registration-form-input-checkbox"
                />
              </div>
            </div>

            {/* 4 */}
            <div className="trainer-registration-input-container">
              <label className="trainer-registration-form-label">
                You lesson duration
              </label>
              <input
                type="number"
                className="trainer-registration-form-input"
                placeholder="in minutes"
                max={120}
                min={45}
              />
            </div>

            {/* 5 */}
            <div className="trainer-registration-input-container">
              <label className="trainer-registration-form-label">
                Charge per lesson
              </label>
              <input
                type="number"
                className="trainer-registration-form-input"
                placeholder="in ₪"
                max={130}
                min={1}
              />
            </div>
            <div className="trainer-registration-form-upload-image">
              <ProfileImageUploader
                profileImageUrl={"profileImageUrl"}
                handleImageChange={handleImageChange}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
