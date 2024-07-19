import { HomeBecomeTrainer } from "../../components/HomeBecomeTrainer/HomeBecomeTrainer";
import { HomeInstructions } from "../../components/HomeInstructions/HomeInstructions";
import { HomeCategories } from "../../components/HomeCategories/HomeCategories";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { HomeHero } from "../../components/HomeHero/HomeHero";

import "./Home.css";

export const Home = () => {
  return (
    <section className="home-page">
      <HomeHero />
      <HomeDivider />
      <HomeCategories />
      <HomeDivider />
      <HomeInstructions />
      <HomeBecomeTrainer />
    </section>
  );
};
