import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left-container">
        <div>logo</div>
        <Link className="navbar-link">find trainers</Link>
        <Link className="navbar-link">become a trainMate</Link>
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
  );
};
