import { chatApi } from "@/libs/api/chat.api";
import { useMutation } from "@tanstack/react-query";
import { SendMessagePayload } from "../../types/chat.model";
import { useQueryClient } from "@tanstack/react-query";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SendMessagePayload): Promise<any> => {
      const response = await chatApi.sendMessage(payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
    onError: () => {},
  });
};
