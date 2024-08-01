import { TbCameraUp } from "react-icons/tb";
import './ProfileImageUploader.css';

const ProfileImageUploader = ({ profileImageUrl, handleImageChange }) => (
  <div className="account-settings-image-container">
  {console.log(profileImageUrl)}
    <div className="image-display-left-box">
      <img src={profileImageUrl} alt="Profile" className="image-display" />
      <button className="image-edit-button" type="button">Edit</button>
    </div>
    <div className="image-upload-right-box">
      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="imageUpload" className="image-upload-button button-transparent">
        <TbCameraUp className="camera-icon" />
        Upload Image
      </label>
      <p className="image-upload-restrictions">
        Maximum size – 2MB
        JPG or PNG format
      </p>
    </div>
  </div>
);

export default ProfileImageUploader;
