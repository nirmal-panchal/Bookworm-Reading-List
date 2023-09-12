import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";

const GlobalContext = createContext();

export function AppProvider({ children }) {
  // status for storing the values in context
  const [token, setToken] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // function for setting the token into state 
  const Login = () => {
    setToken(getCookie("token"));
    setIsLoggedOut(false);
  };

  // function for deleting the cookie and log out
  const Logout = () => {
    deleteCookie("token");
    setToken(null);
    toast.success("Logout Successfully..", {
      style: {
        fontWeight: "bold",
      },
    });
    setIsLoggedOut(true);
  };

  useEffect(() => {
    setToken(getCookie("token"));
  }, []);

  return (
    <GlobalContext.Provider value={{ token, Login, Logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Created a custom hook to access the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
