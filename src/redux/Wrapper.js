"use client";
import React from "react";
import {Provider} from "react-redux";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";
import InitialComponets from "./InitialComponets";

const Wrapper = ({children}) => {
    
  return (
    <Provider store={store}>
      <ToastContainer />
      <InitialComponets>
      {children}
        </InitialComponets>
    </Provider>
  );
};

export default Wrapper;

export const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null; // Return a default value or handle gracefully
  },
  setItem: (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
};
