import React from "react";
import Navbar from "../components/comman/Navbar";
import BreakingNews from "../components/core/HomePage/BreakingNews";
import News from "../components/core/HomePage/News";
import Footer from "../components/comman/Footer";
import Reels from "../components/core/HomePage/Reels";
import PollAns from "../components/core/HomePage/PollAns";
import Category from "../components/core/HomePage/Category";
import Tab from "../components/core/HomePage/Tab";
import AddSlideBar from "../components/comman/AddSlideBar";

import VIdeos from "../components/home/VIdeos";
import LiveSection from "../components/home/LiveSection";
import ButtomAdd from "../components/comman/ButtomAdd";
import BannerImage from "../components/core/HomePage/BannerImage";
import LatestNews from "../components/home/LatestNews";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <div className="mt-40 overflow-x-hidden">
        {/* <AddSlideBar /> */}
        <br />
        <BreakingNews />
        <LatestNews />
        <News />
        <br />
        <VIdeos />
        <Category />
        <ButtomAdd />

        {/* <Reels /> */}
        {/* <PollAns /> */}
        <Tab />
      </div>
      <br />
      <br />
      {/* <BannerImage /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
