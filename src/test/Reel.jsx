import React, { useState, useEffect } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const App = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const reels = [
    {
      id: 1,
      reelInfo: {
        url: "https://www.youtube.com/embed/w032LPqtCA4", // YouTube Shorts embed URL
        description: "A funny bunny video",
        postedBy: {
          avatar: "avatar1.jpg",
          name: "User1",
        },
      },
    },
    {
      id: 2,
      reelInfo: {
        url: "https://www.youtube.com/embed/tgbNymZ7vqY", // Example YouTube video URL
        description: "An animated short film",
        postedBy: {
          avatar: "avatar2.jpg",
          name: "User2",
        },
      },
    },
    {
      id: 3,
      reelInfo: {
        url: "https://www.youtube.com/embed/lTTajzrSkCw", // Example YouTube video URL
        description: "A spectacular fire show",
        postedBy: {
          avatar: "avatar3.jpg",
          name: "User3",
        },
      },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReelIndex((prevIndex) => (prevIndex + 1) % reels.length);
    }, 5000); // Change reel every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [reels.length]);

  const handleBack = () => {
    window.history.back(); // Go back in history
  };

  const currentReel = reels[currentReelIndex];

  return (
    <div className="p-1 rounded-3xl flex items-center min-h-[100vh] justify-center relative bg-gray-200">
      <div
        className="relative bg-white p-4 rounded-xl shadow-md"
        style={{
          width: 400,
          height: 300,
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
        }}
      >
        <iframe
          src={currentReel.reelInfo.url}
          title={currentReel.reelInfo.description}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-xl"
        ></iframe>
        <div className="mt-2">
          <p>{currentReel.reelInfo.description}</p>
          <div className="flex items-center mt-1">
            <img
              src={currentReel.reelInfo.postedBy.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{currentReel.reelInfo.postedBy.name}</span>
          </div>
        </div>
      </div>

      <div className="fixed top-5 left-2 text-white cursor-pointer bg-[#730101]">
        <FaRegArrowAltCircleLeft size={30} onClick={handleBack} />
      </div>

      {currentReelIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-600 text-white rounded-full"
          onClick={() => setCurrentReelIndex(currentReelIndex - 1)}
        >
          Previous
        </button>
      )}
      {currentReelIndex < reels.length - 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-600 text-white rounded-full"
          onClick={() => setCurrentReelIndex(currentReelIndex + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default App;
