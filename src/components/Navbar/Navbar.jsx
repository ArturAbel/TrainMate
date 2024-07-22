import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);

  function showOrHide() {
    setShowSettings(!showSettings);
  }

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user ? (
        <div className="navbar">
          <div className="navbar-left-container">
            <div className="navbar-link">logo</div>
          </div>
          <div className="navbar-right-container">
            <div className="navbar-link">favorites</div>

            <div className="dropdown-container ">
              <div onClick={showOrHide}> picture</div>
              {showSettings && (
                <ul className="navbarList">
                  <li>Messages</li>
                  <li>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        <nav className="navbar">
          <div className="navbar-left-container">
            <div>logo</div>
            <Link className="navbar-link">Find Trainers</Link>
            <Link className="navbar-link">Become a TrainMate</Link>
          </div>
          <div className="navbar-right-container">
        <Link to={"login"}>
              <button className="navbar-login-button button-transparent">
                <MdOutlineLogin className="navbar-login-icon" />
                log in
              </button>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
