import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/libs/api/file.api";
import { UploadFilePayload } from "@/types/file.model";

export const useUploadProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UploadFilePayload): Promise<any> => {
      const response = await fileApi.uploadFile(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: () => {},
  });
};
