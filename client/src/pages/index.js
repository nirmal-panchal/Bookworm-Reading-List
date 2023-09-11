import Hero from "@/components/Hero";
import Recommended from "@/components/Recommended";
import TopSellers from "@/components/TopSellers";
import React from "react";

const Index = () => {
  return (
    <div className="max-w-full w-[1440px] px-5 mx-auto ">
      <Hero />
      <TopSellers />
      <Recommended />
    </div>
  );
};

export default Index;
