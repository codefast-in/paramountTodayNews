import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
const CategoryTabs = () => {
  // Extract the "राज्य" category data
  const { category } = useSelector((state) => state.news);

  const rajyaCategory = category.find((cat) => cat.name === "राज्य");

  // Set initial active tab to the first subcategory
  const [activeTab, setActiveTab] = useState(
    rajyaCategory?.subCategories[0]?._id
  );

  useEffect(() => {
    // console.log(rajyaCategory);
  }, [activeTab]);

  const truncateText = (text, wordLimit = 10) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="w-11/12 mx-auto  ">
      {/* Tabs */}
      <div className="tabs flex  space-x-4 mb-4 overflow-x-auto bg-blue-900 justify-between ">
        {rajyaCategory?.subCategories?.map((subCategory) => (
          <button
            key={subCategory?._id}
            className={`tab p-2 rounded-lg transition-colors duration-300 text-[12px] lg:text-xl ${
              activeTab === subCategory?._id
                ? "bg-red-700 text-white shadow-lg font-semibold"
                : " text-white hover:bg-[#730101]"
            }`}
            onClick={() => setActiveTab(subCategory?._id)}
          >
            {subCategory?.name}
          </button>
        ))}
      </div>

      {/* News Articles */}
      <div className="news-articles">
        {rajyaCategory?.subCategories?.map((subCategory) => (
          <div
            key={subCategory?._id}
            className={`news-list ${
              activeTab === subCategory?._id ? "block" : "hidden"
            } transition-opacity duration-300 grid grid-cols-1 md:grid-cols-3 gap-4`}
          >
            {subCategory.news.map((newsItem, index) => (
              <Link
                href={`/${newsItem?.slug}`}
                key={index}
                className="news-item p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`flex gap-3 lg:text-[15px] ${
                    index === 0 ? "col-span-3 md:col-span-1" : ""
                  }`}
                >
                  <img
                    src={newsItem?.images[0]?.url}
                    alt=""
                    className="h-[100px] w-[100px] object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold lg:text-lg  mb-2">
                      {truncateText(newsItem?.title, 20)}
                    </h3>
                  </div>
                </div>
                {/* Add more details as needed */}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
