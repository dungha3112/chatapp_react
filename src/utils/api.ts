import axios, { AxiosRequestConfig } from "axios";
import { CreateUserParams, UserCredentialsParams, UserType } from "./types";

const BASEURL = import.meta.env.VITE_APP_KEY_URL;

const axiosClient = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
} as AxiosRequestConfig);

export const postRegisterApi = (data: CreateUserParams) => {
  return axiosClient.post("auth/register", data);
};

export const postLoginApi = (data: UserCredentialsParams) => {
  return axiosClient.post("auth/login", data);
};

export const getStatusApi = () => axiosClient.get<UserType>("auth/status");
