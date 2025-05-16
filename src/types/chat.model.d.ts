import { UserResponse } from "./user.model";

export interface SendMessagePayload {
  receiverId: string;
  messages: string;
}

export interface ViewMessagePayload {
  receiverId: string;
}

export interface MessageType {
  _id: string;
  senderId: string;
  receiverId: string;
  messages: string;
  createdAt: string;
  updatedAt: string;
}
export interface MessageResponse {
  data: MessageType[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
