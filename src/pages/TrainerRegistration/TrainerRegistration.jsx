import ProfileImageUploader from "../../components/ProfileImageUploader/ProfileImageUploader";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { anonymousImage, sports } from "../../utilities/constants";
import { useDispatch, useSelector } from "react-redux";
import { isFormValid } from "./TrainerRegistrationlib";
import { BsHandThumbsUp } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  fetchTrainers,
  updateTrainer,
  uploadTrainerProfileImage,
} from "../../redux/features/trainerSlice";
import {
  registrationExplanation,
  registrationInstructions,
} from "./TrainerRegistrationText";

import "./TrainerRegistration.css";

export const TrainerRegistration = () => {
  const { trainers, loading } = useSelector((state) => state.trainer);
  const [localLoading, setLocalLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiKey = "AIzaSyBrl6-l3pzGlN-5PrX8JVqB4wLrC0t2aJQ";

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    description: "",
    about: "",
    address: "",
    level: [],
    lessonLength: "",
    price: "",
  });

  const [scriptLoaded, setScriptLoaded] = useState(false);

  const loadGoogleMaps = (apiKey, callbackName) => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window[callbackName] = () => {
        setScriptLoaded(true);
      };

      return () => {
        document.head.removeChild(script);
      };
    } else {
      if (callbackName && typeof window[callbackName] === "function") {
        window[callbackName]();
      }
    }
  };

  useEffect(() => {
    loadGoogleMaps(apiKey, "initMap");
  }, [apiKey]);

  useEffect(() => {
    dispatch(fetchTrainers()).then(() => setLocalLoading(false));
  }, [dispatch]);

  const trainerData =
    user && trainers.find((trainerObj) => trainerObj.uid === user.uid);

  useEffect(() => {
    if (trainerData) {
      setFormData({
        name: trainerData.name,
        sport: trainerData.sport || "",
        description: trainerData.description || "",
        about: trainerData.about || "",
        address: trainerData.address || "",
        level: trainerData.level || [],
        lessonLength: trainerData.lessonLength || "",
        price: trainerData.price || "",
      });
    }
  }, [trainerData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadTrainerProfileImage(file, trainerData.uid));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        level: checked
          ? [...prevFormData.level, value]
          : prevFormData.level.filter((level) => level !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePlaceSelected = (coords, address) => {
    setFormData({ ...formData, address });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (trainerData) {
      dispatch(updateTrainer(trainerData.uid, formData));
      if (trainerData.approved) {
        navigate(`/trainer-panel/${trainerData.uid}`);
      } else {
        navigate("/pending-trainer");
      }
    }
  };

  if (localLoading || loading) {
    return <div>Loading trainer data...</div>;
  }

  const profileImageUrl =
    trainerData?.image ||
    (user && user.photoURL ? user.photoURL : anonymousImage);

  return (
    <>
      {/* Instructions */}
      <section className="trainer-registration-section">
        <div className="trainer-registration-instructions-container">
          <div>
            <h1 className="trainer-registration-instructions-title">
              <BsHandThumbsUp className="trainer-registration-instructions-icon" />
              Instructions
              <BsHandThumbsUp className="trainer-registration-instructions-icon" />
            </h1>
            <p className="trainer-registration-instructions-explanation">
              {registrationExplanation}
            </p>
          </div>
          <div className="trainer-registration-instruction-container">
            {registrationInstructions.map((line, index) => (
              <div key={index}>
                <h2 className="trainer-registration-instruction-subtitle">
                  {line.title}
                </h2>
                <p className="trainer-registration-instruction-text">
                  {line.text}
                </p>
                {line.guidelines &&
                  line.guidelines.map((guideline, idx) => (
                    <p
                      key={idx}
                      className="trainer-registration-instruction-text"
                    >
                      <strong>{guideline}</strong>
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </div>
        {/* Form */}
        <div className="trainer-registration-form-container">
          <form className="trainer-registration-form" onSubmit={handleSubmit}>
            <div className="trainer-registration-input-container">
              <label className="trainer-registration-form-label">
                Choose your sport
              </label>
              <select
                className="trainer-registration-form-input"
                name="sport"
                value={formData.sport}
                onChange={handleInputChange}
              >
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
            <LoginInput
              labelClass={"trainer-registration-form-label"}
              inputClass={"trainer-registration-form-input"}
              label={"Add your full name"}
              onChange={handleInputChange}
              value={formData.name}
              placeholder={""}
              name={"name"}
              type={"text"}
            />
            <LoginInput
              placeholder={
                "Ex: Aerobics coach with a focus on youth development."
              }
              labelClass={"trainer-registration-form-label"}
              inputClass={"trainer-registration-form-input form-input-longer"}
              label={"Provide a short description"}
              onChange={handleInputChange}
              value={formData.description}
              name={"description"}
              type={"text"}
            />

            <div className="trainer-registration-input-container">
              <label className="trainer-registration-form-label">
                Write about yourself
              </label>
              <textarea
                className="trainer-registration-form-input form-textarea"
                name="about"
                placeholder="Ex: I have been training youth for over 3 years. My focus is on building foundational skills and instilling a well... My qualifications are...."
                onChange={handleInputChange}
                value={formData.about}
              />
            </div>
            <LoginInput
              labelClass={"trainer-registration-form-label"}
              inputClass={"trainer-registration-form-input"}
              placeholder={"Ex: Tel Aviv"}
              onChange={handleInputChange}
              value={formData.address}
              label={"Your address"}
              name={"address"}
              type={"text"}
              enableAutocomplete={true}
              apiKey={apiKey}
              onPlaceSelected={handlePlaceSelected}
              scriptLoaded={scriptLoaded}
            />
            <div className="trainer-registration-input-container">
              {/* Make checkbox component */}
              <div className="trainer-registration-input-container">
                <label htmlFor="" className="trainer-registration-form-label">
                  Which level do you teach
                </label>
                <div className="trainer-registration-input-container-level">
                  <div className="trainer-registration-level-container">
                    <label className="trainer-registration-form-level-label">
                      Beginner
                    </label>
                    <input
                      type="checkbox"
                      className="trainer-registration-form-input-checkbox"
                      name="level"
                      value="Beginner"
                      checked={formData.level.includes("Beginner")}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="trainer-registration-level-container">
                    <label className="trainer-registration-form-level-label">
                      Intermediate
                    </label>
                    <input
                      type="checkbox"
                      className="trainer-registration-form-input-checkbox"
                      name="level"
                      value="Intermediate"
                      checked={formData.level.includes("Intermediate")}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="trainer-registration-level-container">
                    <label className="trainer-registration-form-level-label">
                      Advanced
                    </label>
                    <input
                      type="checkbox"
                      className="trainer-registration-form-input-checkbox"
                      name="level"
                      value="Advanced"
                      checked={formData.level.includes("Advanced")}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="trainer-registration-level-container">
                    <label className="trainer-registration-form-level-label">
                      Expert
                    </label>
                    <input
                      type="checkbox"
                      className="trainer-registration-form-input-checkbox"
                      name="level"
                      value="Expert"
                      checked={formData.level.includes("Expert")}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="trainer-registration-level-container">
                    <label className="trainer-registration-form-level-label">
                      Master
                    </label>
                    <input
                      className="trainer-registration-form-input-checkbox"
                      checked={formData.level.includes("Master")}
                      onChange={handleInputChange}
                      type="checkbox"
                      name="level"
                      value="Master"
                    />
                  </div>
                </div>
              </div>
              <LoginInput
                labelClass={"trainer-registration-form-label"}
                inputClass={"trainer-registration-form-input"}
                label={"Your lesson duration"}
                value={formData.lessonLength}
                onChange={handleInputChange}
                placeholder={"In minutes"}
                name={"lessonLength"}
                type={"number"}
                max={120}
                min={45}
              />
              <LoginInput
                labelClass={"trainer-registration-form-label"}
                inputClass={"trainer-registration-form-input"}
                onChange={handleInputChange}
                label={"Charge per lesson"}
                value={formData.price}
                placeholder={"In ₪"}
                type={"number"}
                name={"price"}
                max={130}
                min={1}
              />
              <div className="trainer-registration-form-upload-image">
                <ProfileImageUploader
                  handleImageChange={handleImageChange}
                  profileImageUrl={profileImageUrl}
                />
              </div>
            </div>
            <button
              id="trainer-registration-register-button"
              disabled={!isFormValid(formData)}
              className="button-transparent"
              type="submit"
            >
              Send Registration Details
            </button>
          </form>
        </div>
      </section>
      <HomeDivider />
    </>
  );
};
