import { parallaxEffect } from "../../utilities/parallaxEffect";
import { ButtonHome } from "../ButtonHome/ButtonHome";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./HomeHero.css";
import "./HomeHero.tablet.css";
import "./HomeHero.phone.css";

export const HomeHero = () => {
  // Parallax Effect
  const containerReference = useRef(null);

  const handleMouseMove = (e) => {
    parallaxEffect(e, ".parallax-effect", containerReference, -80);
    parallaxEffect(e, ".home-hero-title", containerReference, 20);
    parallaxEffect(e, ".hero-button", containerReference, -10);
  };
  useEffect(() => {
    const container = containerReference.current;
    container.addEventListener("mousemove", handleMouseMove);
  }, []);

  const buttonRef = useRef(null);

  // Button
  useEffect(() => {
    const button = buttonRef.current;
    gsap.set(".hero-div-2-icon", { scale: 0 });
    const handleMouseEnter = () => {
      gsap.to(".hero-div-2-icon", { scale: 8, delay: 0.6 });
      gsap.to(".hero-div-2-text", { scale: 0, delay: 0.4 });
      gsap.to(".hero-div-3-icon", { rotate: 60, delay: 0.4 });
    };

    const handleMouseLeave = () => {
      gsap.to(".hero-div-2-icon", { scale: 0 });
      gsap.to(".hero-div-2-text", { scale: 1 });
      gsap.to(".hero-div-3-icon", { rotate: 0 });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
  }, []);

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
        <h2 className="hero-div-2-text">Trainings crafted for you.</h2>
        <FaHeart className="hero-div-2-icon" />
      </div>
      <div className="parallax-effect hero-div hero-div-3">
        <h2 className="hero-div-3-text">Fastest growing sports community!</h2>
        <FaCircleArrowUp className="hero-div-3-icon" />
      </div>
      <h1 className="home-hero-title">
        Elevate your game with the
        <span className="title-span"> ultimate sports</span> training.
      </h1>
      <Link to={"get-started"} ref={buttonRef}>
        <ButtonHome className={"hero-button"} text={"get started"} />
      </Link>
    </section>
  );
};
