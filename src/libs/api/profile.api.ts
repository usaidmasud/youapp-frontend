import instance from "../axios/instance";
import {
  AstrologyPayload,
  CreateProfilePayload,
} from "../../types/profile.model";

const createProfile = async (payload: CreateProfilePayload) => {
  const response = await instance.post("/profile", payload);
  return response;
};

const updateProfile = async (payload: CreateProfilePayload) => {
  const response = await instance.put("/profile", payload);
  return response;
};

const getProfile = async () => {
  const response = await instance.get("/profile");
  return response;
};

const getAstrology = async (payload: AstrologyPayload) => {
  const response = await instance.get("/profile/astrology", {
    params: payload,
  });
  return response;
};

const getAnotherUser = async () => {
  const response = await instance.get("/profile/another-user");
  return response;
};

export const profileApi = {
  createProfile,
  updateProfile,
  getProfile,
  getAstrology,
  getAnotherUser,
};
