"use client";
import React, {useEffect, useState} from "react";
import {fetchSingleSubCategory} from "../services/operations/admin";
// import { Link, useParams } from "react-router-dom";
import Navbar from "../components/comman/Navbar";
import Link from "next/link";

function SubCategorySingle({id}) {
  // const { id } = useParams();
  const [news, setNews] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async (id) => {
      setLoading(true);
      try {
        const response = await fetchSingleSubCategory(id);
        // console.log(response);
        setNews(response.subCategories);
        setRelated(response.randomCategories);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };
    fetchNews(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <Navbar /> */}

      {loading || !news ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className=" w-screen mt-[120px] ">
            <div className=" w-[90%] mx-auto">
              {/* <img
              src={news.image}
              alt={news.name}
              className="w- h- object-cover rounded-lg mb-4"
            /> */}
              <h3 className="text-xl font-semibold mb-2">{news.name}</h3>
              <h4 className="text-md font-light mb-4">{news.description}</h4>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row p-4 gap-4 ">
            {/* Main News Card */}
            <div className="w-full lg:w-7/12">
              {news && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  {news?.news?.map((newsItem) => (
                    <div key={newsItem._id} className="mt-4">
                      <Link
                        href={`/${newsItem?.slug}`}
                        className="text-lg font-semibold mb-2 text-blue-600 underline">
                        {newsItem.title}
                      </Link>
                      <img
                        src={newsItem?.images[0]?.url}
                        alt=""
                        className="w-[60%]"
                      />
                      <h4 className="text-md font-light mb-4">
                        {newsItem.subtitle}
                      </h4>
                      <p className="text-gray-700 mb-4">{newsItem.location}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Related News */}
            <div className="w-full lg:w-5/12  top-10 ">
              <div className="bg-blue-500 p-2 text-white">
                <h3>Related News</h3>
              </div>
              <div className="flex flex-col gap-3 mt-8 p-2">
                {related &&
                  related?.map((currElem) =>
                    currElem.news.map((newsItem) => (
                      <Link
                        href={`/${newsItem?.slug}`}
                        key={newsItem._id}
                        className="flex gap-3 items-center bg-white shadow-md p-2 rounded-lg">
                        <img
                          src={newsItem?.images[0]?.url}
                          alt={newsItem.title}
                          className="w-24 h-auto rounded-lg"
                        />
                        <p className="text-wrap mt-2 text-sm">
                          {newsItem.title}
                        </p>
                      </Link>
                    ))
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SubCategorySingle;
