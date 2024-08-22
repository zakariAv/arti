import React from "react";

import Hero from "../root/containers/Hero";
import DescriptionSection from "./containers/DescriptionSection";
import CategoriesSection from "./containers/CategoriesSection";
import ReportsSection from "./containers/ReportsSection";


const Home = () => {
  return (
    <>
      <Hero />
      <DescriptionSection />
      <CategoriesSection />
      <ReportsSection />
    </>
  );
};

export default Home;
