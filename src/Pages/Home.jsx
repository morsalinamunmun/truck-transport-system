import React from "react";
import OverViewCard from "../components/OverViewCard";
import StatisticsCard from "../components/StatisticsCard";
import DailyCardOverview from "../components/DailyCardOverview";
import MonthlyCustomerPieChart from "../components/PieChart";
import SalesChart from "../components/SalesChart";

const Home = () => {
  return (
    <div className="">
      <DailyCardOverview/>
      <StatisticsCard />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <OverViewCard />
      <MonthlyCustomerPieChart/>
      </div>
      <SalesChart/>
    </div>
  );
};

export default Home;
