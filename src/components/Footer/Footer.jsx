import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import {
  gitHubLink,
  ALT_IMAGE,
  footerGif,
  TRAINER,
} from "../../utilities/constants";

import "./css/Footer.css";
import "./css/Footer.tablet.css";
import "./css/Footer.phone.css";

export const Footer = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <footer className="footer-section">
      <div className="footer-upper-container">
        <div className="footer-upper-left-container">
          <div className="footer-links-container">
            <Link
              to={
                user && user.role === TRAINER
                  ? `/trainer-panel/${user.uid}`
                  : "/sign-up-trainer"
              }
              className="footer-link"
            >
              become trainer
            </Link>
            <Link
              to={
                user && user.role === TRAINER
                  ? `/trainer-panel/${user.uid}`
                  : "/trainers"
              }
              className="footer-link"
            >
              our trainers
            </Link>
            <Link className="footer-link">about</Link>
            <Link className="footer-link">blog</Link>
          </div>
        </div>
        <div className="footer-upper-right-container">
          <div className="footer-logo-container">
            <Logo className={"footer-logo"} />
          </div>
          <div className="footer-image-container">
            <img
              className="footer-image"
              src={footerGif}
              alt={ALT_IMAGE}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <h1 className="footer-follow-us">follow us</h1>
      <div className="footer-social-follow-us-container">
        <div className="footer-social-links-container">
          <div className="footer-social">
            <FaFacebookF />
          </div>
          <div className="footer-social">
            <FaInstagram />
          </div>
          <div className="footer-social">
            <FaTiktok />
          </div>
          <div className="footer-social">
            <Link className="footer-social-link" to={gitHubLink}>
              <FiGithub />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-copyrights">
        <p>2024 © The train.mate Company </p>
      </div>
    </footer>
  );
};
