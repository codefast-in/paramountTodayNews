import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import Link from "next/link";
const Footer = () => {
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVisits: 0,
    totalNews: 0,
    totalCategories: 0,
    totalSubCategories: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/dashboard`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard statistics", error);
      }
    };

    fetchStats();
  }, []);
  return (
    <footer className="bg-[#730101]  border-t-2 border-red-600">
      <div className="container mx-auto py-2">
        <div className="flex justify-center flex-wrap text-sm space-x-4 text-white">
          <Link href="/" className="hover:underline">
            देश
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            विदेश
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            राजनीति
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            मध्य प्रदेश
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            छत्तीसगढ़
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            खेल
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            व्यापार
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            मनोरंजन
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            धर्म एवं ज्योतिष
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            लाइफ स्टाइल
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            दिल्ली/NCR
          </Link>
        </div>
        <div className="flex justify-center items-center py-4 border-t mt-4">
          <div className="flex space-x-4 text-white text-sm">
            <Link href="/about" className="hover:underline">
              हमारे बारे में
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
            <span>|</span>
            <Link href="/archive" className="hover:underline">
              Archive
            </Link>
            <span>|</span>

            {token ? (
              <Link href="/admin/dashboard" className="hover:underline">
                Admin Login
              </Link>
            ) : (
              <Link href="/login" className="hover:underline">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#730101] text-white text-center py-2">
        All Rights Reserved. <br />
        <p> Visits :- {stats.totalVisits}</p>
      </div>
    </footer>
  );
};

export default Footer;
