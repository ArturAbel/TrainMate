import { HomeBecomeTrainer } from "../../components/HomeBecomeTrainer/HomeBecomeTrainer";
import { HomeInstructions } from "../../components/HomeInstructions/HomeInstructions";
import { HomeCategories } from "../../components/HomeCategories/HomeCategories";
import { HomeDivider } from "../../components/HomeDivider/HomeDivider";
import { HomeHero } from "../../components/HomeHero/HomeHero";

import "./Home.css";
import { fetchUsers } from "../../redux/features/usersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

   useEffect(() => {
    
    dispatch(fetchUsers())
   }, []);
   
   console.log(users);
  return (
    <section className="home-page">
      <HomeHero />
      <HomeDivider />
      <HomeCategories />
      <HomeDivider />
      <HomeInstructions />
      <HomeDivider />
      <HomeBecomeTrainer />
      <HomeDivider />
    </section>
  );
};
