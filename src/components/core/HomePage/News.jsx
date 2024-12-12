import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import TVChannel from "../../../test/Test";
import LiveTv from "../../../test/LiveTv";
import LiveSection from "../../home/LiveSection";
import channel from "../../../assest/chanel.jpg";
import Link from "next/link";

const News = () => {
  const { allNews, ads, yt } = useSelector((state) => state.news);

  const displayNews = allNews.slice(9);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const sortedNews = [...allNews].flat().sort((a, b) => {
    const dateA = new Date(a.publish);
    const dateB = new Date(b.publish);

    return dateB - dateA;
  });

  const ytVideo = [...yt].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    // console.log(sortedNews);
  }, [sortedNews]);

  const rightYtVideos = ytVideo.filter(
    (currElem) => currElem?.type === "right-yt"
  );
  const firstThreeVideos = rightYtVideos.slice(0, 2);
  const remainingVideos = rightYtVideos.slice(2, 5);

  return (
    <>
      <div className="main grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[1500px] mx-auto px-5 lg:pl-6 ">
        <div className="first col-span-1 md:col-span-1 mt-3">
          <div className="second grid gap-1">
            <div>{/* <img src={channel} alt="" className="" /> */}</div>
            <p className="text-3xl font-bold text-center my-5">RECENT NEWS</p>

            {sortedNews
              .filter(
                (currElem) =>
                  currElem?.active === true && currElem?.type === "recent-news"
              )
              .slice(0, 6)

              .map((currElem, index) => {
                if (currElem?.type === "recent-news") {
                  return (
                    <Link
                      className="flex gap-4 items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      key={index}
                      href={`/${currElem?.slug}`}
                    >
                      <img
                        src={currElem?.images[0]?.url}
                        alt=""
                        className="w-30 h-20 object-cover rounded-md"
                      />
                      <p className="mt-2 w-[80%] text-sm text-gray-700 font-medium">
                        {truncateText(currElem.title, 15)}
                      </p>
                    </Link>
                  );
                }
                return null;
              })}
            <br />
            {Array.isArray(ads) &&
              ads
                ?.filter((currElem) => currElem?.type === "left-add")
                ?.slice(0, 1)
                ?.map(
                  (currElem, index) =>
                    currElem?.type === "left-add" && (
                      <Link
                        href={currElem?.url}
                        key={index}
                        className="block mb-4"
                        target="_blank"
                      >
                        <img
                          src={currElem?.image}
                          alt="Ad Image"
                          className="w-full rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        />
                      </Link>
                    )
                )}
            <p className="text-3xl font-bold text-center my-5">BIG NEWS</p>
            <br />
            <div className="grid  gap-4">
              {sortedNews
                .filter(
                  (currElem) =>
                    currElem?.active === true && currElem?.type === "big-news"
                )
                .slice(0, 6)
                .map((currEle, index) => {
                  if (currEle?.type === "big-news") {
                    return (
                      <Link
                        href={`/${currEle.slug}`}
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                      >
                        <p className="text-sm font-bold text-gray-800 mb-2">
                          {truncateText(currEle.title, 20)}
                        </p>
                      </Link>
                    );
                  }
                  return null;
                })}
              <br />
              {Array.isArray(ads) &&
                ads
                  ?.filter((currElem) => currElem?.type === "left-add")
                  ?.slice(3, 4)
                  ?.map(
                    (currElem, index) =>
                      currElem?.type === "left-add" && (
                        <Link
                          href={currElem?.url}
                          key={index}
                          className="block mb-4"
                          target="_blank"
                        >
                          <img
                            src={currElem?.image}
                            alt="Ad Image"
                            className="w-full rounded-lg shadow-md hover:shadow-lg transition duration-300"
                          />
                        </Link>
                      )
                  )}
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="second col-span-1 md:col-span-2">
          <div className="mobile ">{/* <LiveSection /> */}</div>
          <p className="text-3xl font-bold text-center mt-3">TOP NEWS</p>
          <br />

          <div className=" grid lg:grid-cols-3 grid-cols-2 gap-2">
            {sortedNews
              .filter((currElem) => currElem?.active === true)
              .filter((currEle) => currEle?.type === "top-news")
              .slice(0, 15)
              .map(
                (currEle, index) =>
                  currEle?.type === "top-news" && (
                    <Link
                      href={`/${currEle.slug}`}
                      key={index}
                      className="bg-white rounded-lg overflow-hidden shadow-md mb-4"
                    >
                      <img
                        src={currEle.images[0]?.url}
                        alt=""
                        className="w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="text-sm font-bold text-gray-800 mb-2">
                          {currEle.title}
                        </p>
                        <p className="text-gray-600">{currEle.subtitle}</p>
                      </div>
                    </Link>
                  )
              )}
          </div>

          <p className="text-3xl font-bold text-center mt-3">ALL NEWS</p>
          <br />

          <div></div>
          <div className="all-news-scroll-container flex gap-4 max-h-[320px] overflow-x-scroll overflow-y-hidden bg-[#730101] p-4">
            {sortedNews
              ?.filter((currElem) => currElem?.active === true)
              .slice(0, 20)
              .map((currEle, index) => {
                if (true) {
                  return (
                    <Link
                      href={`/${currEle.slug}`}
                      key={index}
                      className="text-center rounded-lg shadow-md p- mb-4 w-[200px] bg-white "
                    >
                      <img
                        src={currEle.images[0]?.url}
                        alt=""
                        className="w-fl min-w-[200px] object-cover h-[200px]"
                      />
                      <p className="text-[10px] font-bold text-gray-800 mb- p-2">
                        {truncateText(currEle.title, 15)}
                      </p>
                      {/* <p className="text-gray-600 tex-sm">{currEle.subtitle}</p> */}
                    </Link>
                  );
                }
                return null;
              })}
          </div>
        </div>

        {/* Third Section */}
        <div className="third col-span-1 md:col-span-1">
          {/* <TVChannel /> */}
          {firstThreeVideos.map((currElem, index) => (
            <iframe
              key={index}
              className="mt-3 h-[315px] w-full"
              src={currElem?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}

          <br />
          <br />
          <br />
          {Array.isArray(ads) &&
            ads
              ?.filter((currElem) => currElem?.type === "right-add")
              ?.slice(0, 2)
              .map(
                (currElem, index) =>
                  currElem?.type === "right-add" && (
                    <Link
                      href={currElem?.url}
                      key={index}
                      className="block mb-4"
                      target="_blank"
                    >
                      <img
                        src={currElem?.image}
                        alt="Ad Image"
                        className="w-full rounded-lg shadow-md hover:shadow-lg transition duration-300"
                      />
                    </Link>
                  )
              )}

          {remainingVideos.map((currElem, index) => (
            <iframe
              key={index + 3} // Ensure unique key for the second part
              className="mt-3 h-[315px] w-full"
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
    </>
  );
};

export default News;
