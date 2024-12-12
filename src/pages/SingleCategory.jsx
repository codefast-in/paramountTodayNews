"use client";
import React, {useEffect, useState} from "react";
// import { useParams, Link } from "react-router-dom";
import {fetchSingleCategory} from "../services/operations/admin";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
import Link from "next/link";

function SingleCategory({id}) {
  // const { id } = useParams();
  const [news, setNews] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async (id) => {
      setLoading(true);
      try {
        const response = await fetchSingleCategory(id);
        setNews(response.category);

        // Sort the related news items by createdAt timestamp
        const sortedRelated = response.randomCategory.map((currElem) => ({
          ...currElem,
          news: currElem.news.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ),
        }));

        setRelated(sortedRelated);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };

    fetchNews(id);
    window.scrollTo(0, 0);
  }, [id]);

  // Sort main news items by createdAt timestamp
  const sortedNews =
    news?.news?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) ||
    [];

  return (
    <div>
      {/* <Navbar /> */}

      {loading || !news ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="w- mt-[120px]">
            <div className="w-[90%] mx-auto">
              <h3 className="text-xl font-semibold mb-2">{news?.name}</h3>
              <h4 className="text-md font-light mb-4">{news?.description}</h4>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row p-4 gap-4">
            {/* Main News Card */}
            {!sortedNews.length ? (
              <div className="w-full lg:w-[70%] p-4">
                No News Are Found In This Category
              </div>
            ) : (
              <div className="w-full lg:w-[70%]">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  {sortedNews.map((newsItem) => (
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
              </div>
            )}

            {/* Related News */}
            <div className="w-full lg:w-[28%] top-10 min-h-[80vh]">
              <div className="bg-blue-500 p-2 text-white">
                <h3>Related News</h3>
              </div>
              <div className="flex flex-col gap-3 mt-8 p-2">
                {related.map((currElem) =>
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
                      <p className="text-wrap mt-2 text-sm">{newsItem.title}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default SingleCategory;
