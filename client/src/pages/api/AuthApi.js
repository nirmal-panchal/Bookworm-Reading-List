import axios from "axios";
import { Endpoints } from "./endpoints"; // getting the endpoints of url

// function for new user register
export const RegisterUser = async (body) => {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.POST_REGISTER,
    body
    );
  };

// function for user login
export const LoginUser = async (body) => {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.POST_LOGIN,
    body
  );
};
