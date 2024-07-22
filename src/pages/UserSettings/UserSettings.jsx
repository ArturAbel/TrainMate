
import './UserSettings.css';

const UserSettings = () => {
  return (
    <>
      <section className="user-settings-section">
      <nav className="account-settings-navbar">
        some nav bar links
      </nav>
        <div className="account-settings-container">
          <h1 className="account-settings-title">
            Account Settings
          </h1>
          <div className="account-settings-image-container">
            <div className="image-display-box">
              <img src="" alt="" className="image-display"/>
              <button className="image-edit-button">Edit</button>
            </div>
            .
          </div>
        </div>
      </section>
    </>
  );
};

export default UserSettings;
