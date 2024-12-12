import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {FaSun, FaCloudSun, FaMoon} from "react-icons/fa";
import {useSelector} from "react-redux";
import {MdOutlineMenuOpen} from "react-icons/md";
import {MdKeyboardArrowDown} from "react-icons/md";
import logo from "../../../assest/logo.png";
// import { Link, useNavigate } from "react-router-dom";

import Backdrop from "./Backdrop";
import {handleIsMenuOpen} from "../../../redux/newsSlice";
import {fetchCategory} from "../../../services/operations/admin";
import Link from "next/link";

function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting = "";
  let icon = null;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
    icon = <FaSun className="text-yellow-500" />;
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
    icon = <FaCloudSun className="text-yellow-400" />;
  } else {
    greeting = "Good Evening";
    icon = <FaMoon className="text-blue-500" />;
  }

  return {greeting, icon};
}

function SideNavbar() {
  const {isMenuOpen} = useSelector((state) => state.news);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [click, setClick] = useState(false);
  const {category} = useSelector((state) => state.news);

  const dispatch = useDispatch();
  const ref = useRef(null);
  useOnClickOutside(ref, () => dispatch(handleIsMenuOpen()));

  const {greeting, icon} = getGreeting();

  const handleClose = () => {
    // console.log("Backdrop clicked, closing navbar");
    dispatch(handleIsMenuOpen());
  };

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY =
        document.documentElement.style.getPropertyValue("--scroll-y");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        setCategories(categoriesData?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (category.length !== 0) {
      setCategories(category);
    } else fetchCategories();
  }, []);

  const handleDropdownClick = (index) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className={`fixed top-0 left-0 right-0 bottom-0 z-50  `}>
          <Backdrop onClick={() => dispatch(handleIsMenuOpen())} />
          <motion.div
            id="navbar"
            ref={ref}
            className="fixed top-0 left-0 bottom-0 lg:w-[350px] w-[320px] bg-[#730101] p-4 z-40 border-r-2 shadow-2xl text-lg overflow-y-auto scrollable-div text-white"
            initial={{x: "-100%", opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: "-100%", opacity: 0}}
            transition={{type: "tween", duration: 0.3}}>
            <div className=" mt-6 uppercase " key="navbar">
              <div className=" absolute top-2 right-2">
                <MdOutlineMenuOpen
                  className=" cursor-pointer text-3xl"
                  onClick={() => dispatch(handleIsMenuOpen())}
                />
              </div>
              <div className="flex flex-col  text-lg gap-1 items-center justify-end w-full">
                {/* <div className=" ">
                  <div className="flex items-center justify-end w-full">
                    <div className="">{icon}</div>
                    <div className="flex flex-col gap-3 ">{greeting}</div>
                  </div>
                </div> */}

                <div className="absolute top-3 left-5 w-[200px] justify-center">
                  <img src={logo} className=" h-[50px]  " alt="" />
                </div>
              </div>

              <div className="flex  w-full mt-[70px] flex-col">
                <ul
                  className={`
            space-y-4`}>
                  <li>
                    <Link
                      href="/"
                      className="flex items-center space-x-1 text-white">
                      <span>होम</span>
                    </Link>
                    <div className=" min-w-full min-h-[1px] my-3 bg-white"></div>
                  </li>
                  {categories.map((category, index) => (
                    <li key={category._id} className="hover:text-gray-300">
                      <div
                        href={category.href || "#"}
                        className="flex items-center gap-4 justify-between">
                        <Link
                          href={`/category/${category._id}`}
                          onClick={() => dispatch(handleIsMenuOpen())}>
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
                                dispatch(handleIsMenuOpen());
                              }}
                            />
                          </span>
                        )}
                      </div>
                      <div className=" min-w-full min-h-[1px] my-3 bg-black"></div>
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
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default SideNavbar;
