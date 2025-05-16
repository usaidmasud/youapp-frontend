import instance from "../axios/instance";
import { LoginPayload, RegisterPayload } from "../../types/auth.model";

const login = async (payload: LoginPayload) => {
  const response = await instance.post("/auth/login", payload);
  return response.data;
};

const register = async (payload: RegisterPayload) => {
  const response = await instance.post("/auth/register", payload);
  return response.data;
};

export const authApi = { login, register };
