import instance from "../axios/instance";
import { SendMessagePayload, ViewMessagePayload } from "@/types/chat.model";

const sendMessage = async (payload: SendMessagePayload) => {
  const response = await instance.post("/chat/send-message", payload);
  return response;
};

const viewMessage = async (payload: ViewMessagePayload) => {
  const response = await instance.get("/chat/view-message", {
    params: {
      receiverId: payload.receiverId,
    },
  });
  return response;
};

export const chatApi = {
  sendMessage,
  viewMessage,
};
