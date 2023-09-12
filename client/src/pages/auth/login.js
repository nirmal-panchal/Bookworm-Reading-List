import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { LoginUser } from "../api/AuthApi";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/GlobalContext";
import { setCookie } from "cookies-next";

const Login = () => {
  const { Login } = useGlobalContext(); // importing from context
  const router = useRouter();

  // state for handing form input
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  // function for handing input change
  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // function for submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    toast.promise(LoginUser(formdata), {
      loading: "loading",
      success: (res) => {
        setCookie("token", res?.data?.data);
        setFormdata("");
        router.push("/").then(() => {
          Login();
        });
        return (
          <>
            <b>{res.data.message}</b>
          </>
        );
      },
      error: (err) =>
        err.response ? (
          <b>{err.response.data.message}</b>
        ) : (
          <b>{err.message}</b>
        ),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-md shadow-xl w-96">
        <h2 className="text-2xl font-semibold text-[#FFCE1A] mb-6">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              value={formdata.email || ""}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#FFCE1A]"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              value={formdata.password || ""}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#FFCE1A]"
              placeholder="Your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#FFCE1A] flex items-center justify-around w-full transition-all duration-300 shadow-md text-white 
            py-2 px-4 rounded-lg hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white focus:outline-none focus:border-[#FFCE1A]"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#FFCE1A] hover:underline"
          >
            Register here
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-[#FFCE1A] hover:underline">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
