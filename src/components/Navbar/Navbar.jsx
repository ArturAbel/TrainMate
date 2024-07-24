import { logoutUser } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineLogin } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const dropdownRef = useRef(null);
  function showOrHide() {
    setShowSettings(!showSettings);
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

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left-container">
          <Link to={user ? "/trainers" : "/"}>
            <Logo />
          </Link>
          <Link to="/trainers" className="navbar-link">
            Find Trainers
          </Link>
          {!user && (
            <Link to="/become-trainer" className="navbar-link">
              Become a TrainMate
            </Link>
          )}
        </div>
        {user ? (
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
                    src={user.photoURL || ""}
                    alt="image"
                  />
                </div>
                {showSettings && (
                  <ul className="navbarList">
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
                  </ul>
                )}
              </div>
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
