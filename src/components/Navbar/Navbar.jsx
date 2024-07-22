import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/authSlice";
export const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);

  function showOrHide() {
    setShowSettings(!showSettings);
  }

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left-container">
          <div>logo</div>
          <Link to="/trainers" className="navbar-link">
            Find Trainers
          </Link>
          <Link to="/become-a-trainmate" className="navbar-link">
            Become a TrainMate
          </Link>
        </div>
        {user ? (
          <div className="navbar-right-container">
            <div className="navbar-link">favorites</div>

            <div className="dropdown-container ">
              <div onClick={showOrHide}> picture</div>
              {showSettings && (
                <ul className="navbarList">
                  <li>Messages</li>
                  <li onClick={handleLogoutUser}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="navbar-right-container">
            <Link to="login">
              <button className="navbar-login-button button-transparent">
                <MdOutlineLogin className="navbar-login-icon" />
                Log in
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};
