import { UserResponse } from "./user.model";

export interface CreateProfilePayload {
  name: string;
  birthDate: string;
  gender: string;
  zodiac: string;
  horoscope: string;
  imageUrl: string;
  height: number;
  weight: number;
  interests: string[];
}

export interface ProfileResponse {
  _id: string;
  name: string;
  birthDate: string;
  gender: string;
  zodiac: string;
  horoscope: string;
  imageUrl: string;
  height: number;
  weight: number;
  interests: string[];
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
}

export interface AstrologyPayload {
  birthDate: string;
}
