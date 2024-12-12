import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaArrowLeftLong, FaTimes } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../../../../services/operations/admin';
import { useRouter } from 'next/navigation';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        login(formData.email, formData.password, navigate, dispatch);
      } else {
        signUp(formData, navigate, dispatch);
      }
    } catch (error) {
      setMessage("Error during submission");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-3xl text-center font-semibold mb-4">{isLogin ? "Login" : "Signup"}</h2>
        <div className="border-b-2 border-blue-600 my-3"></div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
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
          )}
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
          {!isLogin && (
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
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-6 text-xl py-2 bg-blue-400 rounded-md"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
            <div className="text-xl text-blue-600 cursor-pointer" onClick={toggleForm}>
              {isLogin ? "Not Have Account?" : "Already User?"}
            </div>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AuthModal;
