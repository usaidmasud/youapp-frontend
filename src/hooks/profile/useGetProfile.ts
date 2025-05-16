import { profileApi } from "@/libs/api/profile.api";
import { ProfileResponse } from "../../types/profile.model";
import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/types/user.model";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<UserResponse> => {
      const response = await profileApi.getProfile();
      return response.data;
    },
    retry: 1,
  });
};
