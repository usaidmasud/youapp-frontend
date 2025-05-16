import { profileApi } from "@/libs/api/profile.api";
import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/types/user.model";

export const useGetAnotherUser = () => {
  return useQuery({
    queryKey: ["another-user"],
    queryFn: async (): Promise<UserResponse[]> => {
      const response = await profileApi.getAnotherUser();
      return response.data;
    },
    retry: 1,
  });
};
