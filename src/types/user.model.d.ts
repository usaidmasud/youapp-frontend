import { ProfileResponse } from "./profile.model";

export interface UserResponse {
  _id: string;
  email: string;
  password: string;
  username: string;
  profile: ProfileResponse;
  createdAt: string;
  updatedAt: string;
}
