import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";
import { Router, useRouter } from "next/router";

const GlobalContext = createContext();

export function AppProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();
  const Login = () => {
    setToken(getCookie("token"));
    setIsLoggedOut(false);
  };

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

// Create a custom hook to access the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
