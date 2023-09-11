import axios from "axios";
import { Endpoints } from "./endpoints";

export const RegisterUser = async (body) => {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.POST_REGISTER,
    body
  );
};

export const LoginUser = async (body) => {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + Endpoints.POST_LOGIN,
    body
  );
};
