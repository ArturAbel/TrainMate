import { HomeInstructions } from "../../components/HomeInstructions/HomeInstructions";
import { HomeCategories } from "../../components/HomeCategories/HomeCategories";
import { HomeHero } from "../../components/HomeHero/HomeHero";

import "./Home.css";

export const Home = () => {
  return (
    <section className="home-page">
      <HomeHero />
      <HomeCategories />
      <HomeInstructions />
    </section>
  );
};
