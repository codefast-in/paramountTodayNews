"use client"
import React, { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { signUp } from '../services/operations/admin';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useRouter()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     signUp(formData,navigate,dispatch)
    } catch (error) {
      setMessage("Error during signup");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Link
        className="bg-blue-400 flex items-center w-fit px-10 py-4 gap-3 font-bold text-sm"
        href="/"
      >
        <FaArrowLeftLong />
        <p>Back to Home</p>
      </Link>

      <div className="flex items-center justify-center h-[87vh]">
        <div className="bg-gray-300 hover:bg-gray-200 p-8 rounded-lg shadow-lg lg:w-[25%] h-auto">
          <h2 className="text-3xl text-center font-semibold mb-4">Signup</h2>
          <div className="border border-b-2 border-blue-600 my-3"></div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-xl font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-xl cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-xl font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter Location"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-6 text-xl py-2 bg-blue-400 rounded-md"
              >
                Signup
              </button>
              <div className=" text-xl  text-blue-600">
                <Link href="/login">Already User?</Link>
              </div>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
