import React from "react";
import OverViewCard from "../components/OverViewCard";
import StatisticsCard from "../components/StatisticsCard";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <OverViewCard />
      <StatisticsCard />
    </div>
  );
};

export default Home;
