import { profileApi } from "@/libs/api/profile.api";
import { useMutation } from "@tanstack/react-query";
import { CreateProfilePayload } from "../../types/profile.model";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateProfilePayload): Promise<any> => {
      const response = await profileApi.createProfile(payload);
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
