import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import bhossi from "../../assest/logo.png";
import { IoCloseCircleOutline } from "react-icons/io5";

function Cube() {
  const [toggle, setToggle] = useState(true);
  const location = useLocation();

  // Check if the URL contains '/livetv/master.m3u8'
  const shouldShowCube = !location.pathname.includes("/livetv/master.m3u8");

  if (!shouldShowCube) {
    return null; // Do not render anything if the condition is not met
  }

  return (
    <>
      {toggle && (
        <div className="cube-container mt-10 relative">
          <div className="cube">
            <div className="cube-face front">
              <img src={bhossi} alt="Front" />
            </div>
            <div className="cube-face back">
              <img src={bhossi} alt="Back" />
            </div>
            <div className="cube-face right">
              <img src={bhossi} alt="Right" />
            </div>
            <div className="cube-face left">
              <img src={bhossi} alt="Left" />
            </div>
            <div className="cube-face top">
              <img src={bhossi} alt="Top" />
            </div>
            <div className="cube-face bottom">
              <img src={bhossi} alt="Bottom" />
            </div>
          </div>

          <div
            className="absolute lg:-top-10 -top-7 text-2xl lg:-right-5 -right-3 lg:text-4x cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            <IoCloseCircleOutline />
          </div>
        </div>
      )}
    </>
  );
}

export default Cube;
