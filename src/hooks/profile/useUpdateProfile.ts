import { profileApi } from "@/libs/api/profile.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProfilePayload } from "../../types/profile.model";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateProfilePayload): Promise<any> => {
      const response = await profileApi.updateProfile(payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: () => {},
  });
};
