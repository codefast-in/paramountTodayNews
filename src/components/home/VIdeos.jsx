import React from "react";
import { useSelector } from "react-redux";

const VideoLayout = () => {
  const { yt } = useSelector((state) => state.news);

  const ytVideo = [...yt].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const rightYtVideos = yt.filter((currElem) => currElem?.type === "middle");
  const first = rightYtVideos.slice(0, 1);
  const second = rightYtVideos.slice(1, 2);
  const third = rightYtVideos.slice(2, 3);
  const four = rightYtVideos.slice(3, 4);
  const five = rightYtVideos.slice(4, 5);
  return (
    <div className="container mx-auto p-4 bg-[#730101] min-w-screen w-[100vw] mt-[100px]">
      {/* Desktop Layout */}

      <h4 className=" text-white font-semibold text-2xl mb-[50px]">वीडियो</h4>
      <div className=" grid lg:grid-cols-5 gap-6 mobile  ">
        <div className=" ">
          {first.map((currElem, index) => (
            <iframe
              key={index}
              className=" w-full h-40"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
          {second.map((currElem, index) => (
            <iframe
              key={index}
              className=" w-full h-40"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>

        <div className=" col-span-3">
          {third.map((currElem, index) => (
            <iframe
              key={index}
              className=" w-full  h-full"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>

        <div>
          {four.map((currElem, index) => (
            <iframe
              key={index}
              className=" w-full h-40"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
          {five.map((currElem, index) => (
            <iframe
              key={index}
              className=" w-full h-40"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>

      <div className=" lg:hidden md:hidden">
        <div>
          {first.map((currElem, index) => (
            <iframe
              key={index}
              className="  w-full h-[300px]"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>

        <div>
          <div className=" flex gap-3 p-4">
            <div>
              {five.map((currElem, index) => (
                <iframe
                  key={index}
                  className="w-[140px]  h-[100px]"
                  src={currElem?.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
            <div>
              {second.map((currElem, index) => (
                <iframe
                  key={index}
                  className="w-[140px]  h-[100px]"
                  src={currElem?.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>

          <div className=" flex gap-3 p-4">
            <div>
              {second.map((currElem, index) => (
                <third
                  key={index}
                  className="w-[140px]  h-[100px]"
                  src={currElem?.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></third>
              ))}
            </div>
            <div>
              {four.map((currElem, index) => (
                <iframe
                  key={index}
                  className="w-[140px]  h-[100px]"
                  src={currElem?.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLayout;
