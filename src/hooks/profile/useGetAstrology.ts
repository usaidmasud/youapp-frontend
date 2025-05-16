import { profileApi } from "@/libs/api/profile.api";
import { AstrologyPayload } from "../../types/profile.model";
import { useMutation } from "@tanstack/react-query";

export const useGetAstrology = () => {
  return useMutation({
    mutationFn: async (payload: AstrologyPayload): Promise<any> => {
      const response = await profileApi.getAstrology(payload);
      return response.data;
    },
  });
};
