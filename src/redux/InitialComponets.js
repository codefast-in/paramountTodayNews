"use client";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useEffect} from "react";
import {fetchCategory, getAllNews} from "@/services/operations/admin";
import SideNavbar from "@/components/comman/Navbar/SideNavbar";
import ScrollToTop from "@/components/comman/ScrollToTop";
import Navbar from "@/components/comman/Navbar";
import Footer from "@/components/comman/Footer";
import {BASE_URL} from "@/services/apis";
import {saveCategory, saveNews, setAds, setYT} from "./newsSlice";
import {usePathname} from "next/navigation";
import {setToken, setUser} from "./authSlice";

const InitialComponets = ({children}) => {
  //   console.log("object");
  const {isMenuOpen} = useSelector((state) => state.news);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const visitAdd = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/visit`);
    } catch (error) {
      console.error("Failed to add visit record dashboard ", error);
    }
  };

  const getAllYt = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/yt/getAll`);
      if (!response?.data?.success) {
        throw new Error(toast.error(response.data.message));
      }
      dispatch(setYT(response?.data?.videos));
      // console.log(response?.data?.ads);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAds = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ads/getAll`);
      if (!response?.data?.success) {
        throw new Error(toast.error(response.data.message));
      }
      dispatch(setAds(response?.data?.ads));
      // console.log(response?.data?.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.getItem("token") &&
      dispatch(setToken(JSON.parse(localStorage.getItem("token"))));

    localStorage.getItem("user") &&
      dispatch(setUser(localStorage.getItem("user")));

    localStorage.getItem("allNews") &&
      dispatch(saveNews(JSON.parse(localStorage.getItem("allNews")) || []));

    localStorage.getItem("category") &&
      dispatch(
        saveCategory(JSON.parse(localStorage.getItem("category")) || [])
      );

    localStorage.getItem("yt") &&
      dispatch(setYT(JSON.parse(localStorage.getItem("yt")) || []));

    localStorage.getItem("ads") &&
      dispatch(setAds(JSON.parse(localStorage.getItem("ads")) || []));

    //Categoyr
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        dispatch(saveCategory(categoriesData?.categories || []));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    getAllAds();
    getAllYt();
    dispatch(getAllNews());
    if (user?.role !== "Admin" && user?.role !== "SuperAdmin") {
      visitAdd();
    }
  }, []);
  const pathname = usePathname();
  const hideNavFoot =
    pathname.includes("login") || pathname.includes("register");
  //  console.log(hideNavFoot)
  return (
    <div>
      {!hideNavFoot && <Navbar />}
      {children}
      {!hideNavFoot && <Footer />}
      {isMenuOpen && <SideNavbar />}
      <ScrollToTop />
    </div>
  );
};

export default InitialComponets;
