import { HomeCategoriesStrip } from "../HomeCategoriesStrip/HomeCategoriesStrip";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import "./HomeCategories.css";

export const HomeCategories = () => {
  const homeCategoriesRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.set(".strip-1", {
      x: 150,
    });

    gsap.set(".strip-2", {
      x: -300,
    });

    gsap.set(".strip-3", {
      x: 200,
    });

    gsap.to(".strip-1", {
      x: -50,
      ease: "none",
      scrollTrigger: {
        trigger: homeCategoriesRef.current,
        start: "top center",
        end: "+=1200",
        scrub: 1,
      },
    });

    gsap.to(".strip-2", {
      x: -200,
      ease: "none",
      scrollTrigger: {
        trigger: homeCategoriesRef.current,
        start: "top center",
        end: "+=1200",
        scrub: 1,
      },
    });

    gsap.to(".strip-3", {
      x: 50,
      ease: "none",
      scrollTrigger: {
        trigger: homeCategoriesRef.current,
        start: "top center",
        end: "+=1200",
        scrub: 1,
      },
    });
  });

  return (
    <section ref={homeCategoriesRef} className="home-categories-section">
      <HomeCategoriesStrip text={"pick"} className={"strip-1"} />
      <HomeCategoriesStrip text={"any"} className={"strip-2"} />
      <HomeCategoriesStrip text={"sport"} className={"strip-3"} />
    </section>
  );
};
