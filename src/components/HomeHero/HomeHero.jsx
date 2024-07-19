import { parallaxEffect } from "../../utilities/parallaxEffect";
import { ButtonHome } from "../ButtonHome/ButtonHome";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import "./HomeHero.css";

export const HomeHero = () => {
  // Parallax Effect
  const containerReference = useRef(null);
  const handleMouseMove = (e) => {
    parallaxEffect(e, ".parallax-effect", containerReference, -80);
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
      {/* Change names and design the div classes */}
      <div className="parallax-effect div div-1">image</div>
      <div className="parallax-effect div div-2">image</div>
      <div className="parallax-effect div div-3">image</div>
      <h1 className="home-hero-title">
      Elevate your game with the <span className="title-span">ultimate sports</span> training.
      </h1>
      <ButtonHome className={"hero-button"} />
    </section>
  );
};
