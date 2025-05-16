import { chatApi } from "@/libs/api/chat.api";
import { MessageResponse } from "../../types/chat.model";
import { useQuery } from "@tanstack/react-query";
import { ViewMessagePayload } from "../../types/chat.model";

export const useGetMessage = (params: ViewMessagePayload) => {
  return useQuery({
    queryKey: ["messages", params],
    queryFn: async (): Promise<MessageResponse> => {
      const response = await chatApi.viewMessage(params);
      return response.data;
    },
    retry: 1,
  });
};
