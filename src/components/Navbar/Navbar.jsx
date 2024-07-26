import { logoutUser } from "../../redux/features/authSlice";
import { anonymousImage } from "../../utilities/constants";
import { useSelector, useDispatch } from "react-redux";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

import "./Navbar.css";

export const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);

  function showOrHide() {
    setShowSettings((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(logoutUser());
    setShowSettings((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left-container">
        <Link
          to={
            user && user.role === "trainee"
              ? "/trainers"
              : user && user.role === "trainer"
              ? "/trainer-panel"
              : "/"
          }
        >
          <Logo />
        </Link>
        {user && user.role === "trainee" && (
          <Link to="/trainers" className="navbar-link">
            Find Trainers
          </Link>
        )}
        {!user && (
          <Link to="/become-trainer" className="navbar-link">
            Become a TrainMate
          </Link>
        )}
      </div>

      {user ? (
        user.role === "trainee" ? (
          <div className="navbar-right-container">
            <div className="navbar-icons-container">
              <Link>
                <BiMessageSquareDetail className="navbar-icon" />
              </Link>
              <Link to={"/favorites"}>
                <FiHeart className="navbar-icon" />
              </Link>
              <div className="dropdown-container " ref={dropdownRef}>
                <div onClick={showOrHide}>
                  <img
                    className="navbar-user-image"
                    src={user.photoURL || anonymousImage}
                    alt="image"
                  />
                </div>
                {showSettings && (
                  <div className="navbarList">
                    <Link to={"/settings"} className="navbarList-item">
                      settings
                    </Link>
                    <Link className="navbarList-item">Messages</Link>
                    <Link
                      className="navbarList-item logout-link"
                      onClick={handleLogoutUser}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : user.role === "trainer" ? (
          <div className="navbar-right-container">
            <div className="navbar-icons-container">
              <Link to={"/trainer-panel"}>
                <BiMessageSquareDetail className="navbar-icon" />
              </Link>
              <Link to={"/trainer-panel"}>
                <MdOutlineReviews className="navbar-icon" />
              </Link>
              <div className="dropdown-container " ref={dropdownRef}>
                <div onClick={showOrHide}>
                  <img
                    className="navbar-user-image"
                    src={user.photoURL || anonymousImage}
                    alt="image"
                  />
                </div>
                {showSettings && (
                  <div className="navbarList">
                    <Link to={"/settings"} className="navbarList-item">
                      settings
                    </Link>
                    <Link className="navbarList-item">Messages</Link>
                    <Link
                      className="navbarList-item logout-link"
                      onClick={handleLogoutUser}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null
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
  );
};
