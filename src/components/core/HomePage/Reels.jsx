import React from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

const Reels = () => {
  const {  yt } = useSelector((state) => state.news);


  const videoIds = yt.filter((currElem) => currElem?.type === "short");



 
  const opts = {
    height: "400",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <p className="text-center text-3xl font-bold my-10">
        See Our Letest Reels
      </p>
      <div className="max-w-7xl mx-auto grid justify-center items-center gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        {videoIds.map((video) => (
          <YouTube key={video?._id} videoId={video?.url} opts={opts} />
        ))}
      </div>
    </div>
  );
};

export default Reels;
