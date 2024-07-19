import { parallaxEffect } from "../../utilities/parallaxEffect";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import "./HomeHero.css";

export const HomeHero = () => {



  // Parallax Effect
  const containerReference = useRef(null);
  const handleMouseMove = (e) => {
    parallaxEffect(e, ".parallax-effect", containerReference, -50);
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
      <div className="parallax-effect div div-1"></div>
      <div className="parallax-effect div div-2"></div>
      <div className="parallax-effect div div-3"></div>
      <h1 className="home-hero-title">
        Join the <span className="title-span">Ultimate Sports</span> Training
        Community.
      </h1>
    </section>
  );
};
