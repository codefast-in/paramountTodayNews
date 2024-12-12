"use client";
import React, {useEffect, useState} from "react";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";
import {FaFacebookF, FaSearch} from "react-icons/fa";
import {TbBrandThreads} from "react-icons/tb";
import {IoMenu} from "react-icons/io5";

import {MdKeyboardArrowDown} from "react-icons/md";

import {fetchCategory} from "../../services/operations/admin";
import {handleIsMenuOpen} from "../../redux/newsSlice";
import {useDispatch, useSelector} from "react-redux";
import RealTimeClockAndCube from "./Navbar/RealTime";
import SearchBox from "./Navbar/Search";
import {logout} from "../../services/operations/user";
import {IoIosLogOut} from "react-icons/io";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";
const logo = require("../../assest/logo.png");
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [click, setClick] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();
  const {user} = useSelector((state) => state.auth);

  const {category} = useSelector((state) => state.news);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifcationOpen, setNotification] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const togglenoti = () => {
    setNotification(!isNotifcationOpen);
  };

  const dispatch = useDispatch();
  const priorityOrder = [
    "राजनीति",
    "देश",
    "राज्य",
    "खेल",
    "शिक्षा",
    "मनोरंजन",
    "ऐस्ट्रो",
    "लाइफस्टाइल",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        const sortedCategories = sortCategories(
          categoriesData?.categories || []
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const sortCategories = (categories) => {
      // Create a copy of the array using slice() or spread operator
      return [...categories].sort((a, b) => {
        const indexA = priorityOrder.indexOf(a.name);
        const indexB = priorityOrder.indexOf(b.name);
        return (
          (indexA === -1 ? Infinity : indexA) -
          (indexB === -1 ? Infinity : indexB)
        );
      });
    };

    if (category.length !== 0) {
      const sortedCategories = sortCategories(category);
      setCategories(sortedCategories);
    } else {
      fetchCategories();
    }
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisibility);

  const handleNavClick = () => setNav(!nav);

  const handleDropdownClick = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  // console.log(tok)
  return (
    <nav className=" text-white text-xl  fixed w-screen h-[50px] top-0 z-50 ">
      <div className=" -h-[50px] bg-gray-200  pt-1 min-w-[100vw]">
        <div className="flex justify-end items-center w-11/12 mx-auto gap-2 flex-wrap ">
          {(user?.role === "Admin" || user?.role === "SuperAdmin") && (
            <div>
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-1 text-red-600 text-[15px]">
                Dashboard
              </Link>
            </div>
          )}

          <div className="flex space-x-1 text-white text-[20px]">
            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href=""
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebookF />
            </a>

            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href=""
              target="_blank"
              rel="noopener noreferrer">
              <FaInstagram />
            </a>

            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href=""
              target="_blank"
              rel="noopener noreferrer">
              <FaYoutube />
            </a>

            <a
              className=" bg-green-900 text-sm p-1 rounded-full hover:scale-110"
              href=""
              target="_blank"
              rel="noopener noreferrer">
              <TbBrandThreads />
            </a>
          </div>
          {user ? (
            <button
              onClick={() => dispatch(logout(navigate))}
              className="px-5 py-1 mb-1 flex items-center gap-2 bg-[#2156a4] text-white rounded-md">
              Logout <IoIosLogOut />
            </button>
          ) : (
            <div className="flex gap-3 ml-5 text-[13px] text-blue-900 px-2">
              <Link
                href="/login"
                className="px-5 py-1 mb-1 bg-[#2156a4] text-white rounded-md">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className=" bg-[#730101] relative ">
        <div className=" mx-auto flex justify-between w-11/12  items-center font-bold py-5 min-h-[50px]">
          <div className="text-2xl font-bold flex  items-center gap-5">
            <div>
              <IoMenu
                onClick={() => dispatch(handleIsMenuOpen())}
                className=" text-3xl cursor-pointer"
              />
            </div>
            <Link href="/">
              <Image
                src={logo}
                className={`transition-all duration-300 ${
                  isVisible ? "w-28 -top-1" : "w-28 -top-1"
                } rounded-md absolute `}
                alt="Logo"
              />
              {/* <p>ParamountToday</p> */}
            </Link>
          </div>

          <ul className="hidden md:flex space-x-4 items-center text-lg           ">
            <li>
              <Link href="/" className="flex items-center space-x-1 text-white">
                <span>होम</span>
              </Link>
            </li>
            {categories.map((category, index) => {
              if (category?.active) {
                return (
                  <li
                    key={category._id}
                    className="group "
                    onMouseEnter={() => {
                      handleDropdownClick(index);
                      setClick(true);
                    }}
                    onMouseLeave={() => {
                      handleDropdownClick(null);
                      setClick(false);
                    }}
                    onClick={() => setNav(false)}>
                    <div>
                      <Link
                        href={`/category/${category._id}`}
                        className={`flex items-center space-x-1 ${
                          dropdownIndex === index
                            ? "text-gray-300"
                            : "text-white"
                        }`}
                        onClick={() => setClick(false)}>
                        <span>{category.name}</span>
                      </Link>
                    </div>

                    {dropdownIndex === index && click && (
                      <div className="absolute top-11 left-0 bg-[#730101] text-white rounded-md mt-2 py-5 px-4 min-w-[90vw] flex gap-16">
                        <ul className="text-[13px]">
                          {category.subCategories &&
                            category.subCategories.length > 0 &&
                            category.subCategories.map((subCategory) => (
                              <li key={subCategory._id}>
                                <Link
                                  href={`/subcategory/${subCategory._id}`}
                                  className="hover:text-[#f26434]">
                                  {truncateText(subCategory.name, 15)}
                                </Link>
                              </li>
                            ))}
                        </ul>

                        <div>
                          <div className="grid grid-cols-4 gap-4 mt-2">
                            {category.news &&
                              category.news
                                .slice(0, 4)
                                .filter((newsItem) => newsItem?.active === true)
                                .map((newsItem) => (
                                  <div
                                    key={newsItem._id}
                                    className="border rounded-md overflow-hidden hover:shadow-lg">
                                    <Link
                                      href={`/${newsItem.slug}`}
                                      onClick={() => setClick(false)}>
                                      <img
                                        src={newsItem?.images[0]?.url}
                                        alt={newsItem.title}
                                        className="w-full h-32 object-cover"
                                      />
                                      <div className="p-2">
                                        <h3 className="text-sm font-medium">
                                          {truncateText(newsItem.title, 15)}
                                        </h3>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return null;
            })}
          </ul>

          <div className=" flex items-center space-x-4">
            <FaSearch className="cursor-pointer" onClick={toggleSearch} />
            <SearchBox isOpen={isSearchOpen} toggleSearch={toggleSearch} />

            <RealTimeClockAndCube />
          </div>
        </div>

        <ul
          className={`md:hidden ${
            nav ? "block" : "hidden"
          } bg-blue-900 px-4 py-6 space-y-4`}>
          <li>
            <Link href="/" className="flex items-center space-x-1 text-white">
              <span>होम</span>
            </Link>
          </li>
          {categories.map((category, index) => (
            <li key={category._id} className="hover:text-gray-300">
              <div
                href={category.href || "#"}
                className="flex items-center gap-4">
                <Link
                  href={`/category/${category._id}`}
                  onClick={() => setNav(false)}>
                  {category.name}
                </Link>
                {category?.subCategories?.length !== 0 && (
                  <span>
                    <MdKeyboardArrowDown
                      className=" bg-black rounded-full"
                      onClick={() => {
                        if (category.subCategories.length !== 0) {
                          handleDropdownClick(index);
                          return;
                        }
                        setNav(false);
                      }}
                    />
                  </span>
                )}
              </div>
              {dropdownIndex === index && category.subCategories && (
                <ul className="pl-6 ">
                  {category.subCategories.map((subCategory) => (
                    <li
                      key={subCategory._id}
                      className="py-2 hover:text-gray-300">
                      <Link href={`/subcategory/${subCategory._id}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <div className="flex items-center justify-center space-x-4">
            <Link href="https://www.facebook.com">
              <FaFacebook
                size={24}
                className="text-white hover:text-gray-300"
              />
            </Link>
            <Link href="https://www.instagram.com">
              <FaInstagram
                size={24}
                className="text-white hover:text-gray-300"
              />
            </Link>
            <Link href="https://www.youtube.com">
              <FaYoutube size={24} className="text-white hover:text-gray-300" />
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
