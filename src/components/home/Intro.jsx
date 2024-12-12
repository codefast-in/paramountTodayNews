import React, { useState, useRef } from "react";
import intro from "../../assest/intro.mp4";
import banner from "../../assest/banner.jpg";

const ResponsiveVideoWithThumbnail = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    videoRef.current.play();
  };

  return (
    <div className="flex justify-center items-center p-5 mt-28">
      <div className="w-full max-w-4xl h-[40vh] relative">
        {!isPlaying && (
          <div
            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 cursor-pointer rounded-lg"
            onClick={handlePlayVideo}
          >
            <img
              src={banner}
              alt="Video Thumbnail"
              className="w-full h-[40vh] object-cover rounded-lg"
            />
            <button className="absolute text-white text-4xl">▶</button>
          </div>
        )}
        <video
          ref={videoRef}
          src={intro}
          controls
          className={`w-full h-[40vh] object-cover rounded-lg ${
            !isPlaying ? "hidden" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ResponsiveVideoWithThumbnail;
