import { resetReviewCount } from "../../redux/features/trainerSlice";
import { resetFavoriteCount } from "../../redux/features/usersSlice";
import { logoutUser } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiMessageSquareDetail } from "react-icons/bi";
import { PiExclamationMarkFill } from "react-icons/pi";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { ToolTip } from "../ToolTip/ToolTip";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import {
  anonymousImage,
  TRAINEE,
  TRAINER,
  ADMIN,
} from "../../utilities/constants";

import "./Navbar.css";

export const Navbar = () => {
  const favoriteCount = useSelector((state) => state.users.favoriteCount);
  const reviewsCount = useSelector((state) => state.trainer.reviewCount);
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);
  const { newMessage: userNewMessage } = useSelector((state) => state.users);
  const { newMessage: trainerNewMessage } = useSelector(
    (state) => state.trainer
  );

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
            user
              ? user.role === TRAINEE
                ? "/trainers"
                : user.role === TRAINER
                ? `/trainer-panel/${user.uid}`
                : user.role === ADMIN
                ? "/admin"
                : "/"
              : "/"
          }
        >
          <Logo />
        </Link>
        {user && user.role === TRAINEE && (
          <Link to="/trainers" className="navbar-link">
            Find Trainers
          </Link>
        )}
        {!user && (
          <Link to="/trainers" className="navbar-link">
            Find Trainers
          </Link>
        )}
        {!user && (
          <Link to="/become-trainer" className="navbar-link">
            Become a train.mate
          </Link>
        )}
        {user && user.role === ADMIN && (
          <Link to="/admin" className="navbar-link">
            Pending Trainings
          </Link>
        )}
        {user && user.role === ADMIN && (
          <Link to="/admin-settings" className="navbar-link">
            Users
          </Link>
        )}
      </div>
      {user ? (
        user.role === TRAINEE ? (
          <div className="navbar-right-container">
            <div className="navbar-icons-container">
              <Link
                className="navbar-icon-container tooltip-container"
                to={`trainee-lessons/${user.uid}`}
              >
                <MdOutlineHistoryEdu className="navbar-icon history-icon" />
                <ToolTip text="Lessons" />
              </Link>
              <Link
                className="navbar-counter-link tooltip-container"
                to={`/messages/${user.uid}`}
              >
                <BiMessageSquareDetail className="navbar-icon" />
                <ToolTip text="Messages" />
                {userNewMessage && (
                  <PiExclamationMarkFill className="new-message-indicator" />
                )}
              </Link>
              <Link
                className="navbar-counter-link tooltip-container"
                to={"/favorites"}
              >
                <FiHeart
                  className="navbar-icon"
                  onClick={resetFavoriteCount()}
                />
                <ToolTip text="Favorite" />
                {favoriteCount > 0 && (
                  <p className="navbar-favorite-counter">{favoriteCount}</p>
                )}
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
                    <Link
                      to={`messages/${user.uid}`}
                      className="navbarList-item"
                    >
                      Messages
                    </Link>
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
        ) : user.role === TRAINER ? (
          <div className="navbar-right-container">
            <div className="navbar-icons-container">
              <Link
                to={`/trainer-lesson-history/${user.uid}`}
                className="tooltip-container"
              >
                <MdOutlineHistoryEdu className="navbar-icon history-icon" />
                <ToolTip text="View History" />
              </Link>
              <Link
                className="navbar-counter-link tooltip-container"
                to={`/messages/${user.uid}`}
              >
                <BiMessageSquareDetail className="navbar-icon" />
                <ToolTip text="Messages" />
                {trainerNewMessage && (
                  <PiExclamationMarkFill className="new-message-indicator" />
                )}
              </Link>
              <Link
                className="navbar-counter-link tooltip-container"
                to={`/trainer-reviews/${user.uid}`}
                onClick={resetReviewCount()}
              >
                {reviewsCount > 0 && (
                  <p className="navbar-favorite-counter">{favoriteCount}</p>
                )}
                <MdOutlineReviews className="navbar-icon" />
                <ToolTip text="Reviews" />
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
                    <Link to={"/trainer-settings"} className="navbarList-item">
                      settings
                    </Link>
                    <Link to={"/trainer-panel"} className="navbarList-item">
                      Messages
                    </Link>
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
        ) : user.role === ADMIN ? (
          <div className="navbar-right-container">
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
