import Link from "next/link";
import React, { useEffect } from "react";
import { DiCodeigniter } from "react-icons/di";
// import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function Categorycard({ category }) {
  const latestNews = [...(category?.news || [])]
    .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
    .slice(0, 5);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="  p-1 my-10  ">
      <div>
        <div className=" flex justify-between mb-4">
          <p className=" flex items-center gap-2 font-bold text-2xl ">
            {" "}
            <span>
              <DiCodeigniter className=" text-red-700" />
            </span>
            {category?.name}
          </p>
          <Link
            className=" flex items-center gap-2"
            href={`/category/${category._id}`}
          >
            और भी जानै <FaArrowUpRightFromSquare className=" text-blue-600" />
          </Link>
        </div>

        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6 ">
          {/* //top */}
          <div className=" col-span-2">
            {latestNews[0] && (
              <Link href={`/${latestNews[0]?.slug}`}>
                <img src={latestNews[0]?.images[0]?.url} alt="" className="" />
                <p className="font-semibold">
                  {truncateText(latestNews[0]?.title, 20)}
                </p>
              </Link>
            )}

            {latestNews[1] && (
              <Link
                href={`/${latestNews[1]?.slug}`}
                className="flex gap-2 mt-4"
              >
                <img
                  src={latestNews[1]?.images[0]?.url}
                  alt=""
                  className="h-[60px]"
                />
                <p className="font-semibold text-[12px]">
                  {truncateText(latestNews[1]?.title, 20)}
                </p>
              </Link>
            )}
          </div>

          <div>
            <div>
              {latestNews.slice(2).map((news) => (
                <Link
                href={`/${latestNews[1]?.slug}`}
                
                 key={news._id} className="mb-4 flex gap-2">
                  <img src={news?.images[0]?.url} alt="" className="h-[60px]" />
                  <p className="font-semibold text-[12px]">
                    {truncateText(news?.title, 20)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
