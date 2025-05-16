import { z } from "zod";

export const sendMessageSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  messages: z.string().min(1, "Message is required"),
});
