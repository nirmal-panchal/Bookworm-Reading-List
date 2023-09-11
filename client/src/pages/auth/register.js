import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Endpoints } from "../api/endpoints";
import { RegisterUser } from "../api/AuthApi";

const Register = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    toast.promise(RegisterUser(formdata), {
      loading: "loading",
      success: (res) => {
        setFormdata("");
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
        <h2 className="text-2xl font-semibold text-[#FFCE1A] mb-6">Register</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="username"
              value={formdata.username || ""}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#FFCE1A]"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={handleInputChange}
              value={formdata.email || ""}
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#FFCE1A]"
              placeholder="Enter your email"
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
              value={formdata.password || ""}
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#FFCE1A]"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#FFCE1A] flex items-center justify-around w-full transition-all duration-300 shadow-md text-white 
            py-2 px-4 rounded-lg hover:border-[#FFCE1A] border-2 border-transparent hover:text-[#FFCE1A] hover:bg-white focus:outline-none focus:border-[#FFCE1A]"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FFCE1A] hover:underline">
            Login here
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

export default Register;
