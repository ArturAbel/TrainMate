import { parallaxEffect } from "../../utilities/parallaxEffect";
import { heroImage } from "../../utilities/constants";
import { ButtonHome } from "../ButtonHome/ButtonHome";
import { FaCircleArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import "./HomeHero.css";

export const HomeHero = () => {
  // Parallax Effect
  const containerReference = useRef(null);
  const handleMouseMove = (e) => {
    parallaxEffect(e, ".parallax-effect", containerReference, -80);
    parallaxEffect(e, ".home-hero-title", containerReference, 20);
    parallaxEffect(e, ".hero-button", containerReference, -10);
  };
  useGSAP(
    () => {
      const container = containerReference.current;
      container.addEventListener("mousemove", handleMouseMove);
    },
    { scope: containerReference }
  );

  return (
    <section ref={containerReference} className="home-hero-section">
      <div className="parallax-effect hero-div hero-div-1">
        <h2 className="hero-div-1-text">
          Users show an improved level of dedication.
        </h2>
        <h2 className="hero-div-1-number">+23%</h2>
        <div className="hero-div-1-bars">
          <div className="hero-bar bar-1"></div>
          <div className="hero-bar bar-2"></div>
          <div className="hero-bar bar-3"></div>
          <div className="hero-bar bar-4"></div>
        </div>
      </div>
      <div className="parallax-effect hero-div hero-div-2">
        <h2 className="hero-div-2-text">trainings crafted for you</h2>
        <img className="hero-image" src={heroImage} alt="image" />
      </div>
      <div className="parallax-effect hero-div hero-div-3">
        <h2 className="hero-div-3-text">fastest growing sports community</h2>
        <FaCircleArrowUp className="hero-div-3-icon" />
      </div>
      <h1 className="home-hero-title">
        Elevate your game with the
        <span className="title-span">ultimate sports</span> training.
      </h1>
      <Link to={"get-started"}>
        <ButtonHome className={"hero-button"} text={"get started"} />
      </Link>
    </section>
  );
};
