import instance from "../axios/instance";
import { UploadFilePayload } from "@/types/file.model";

const uploadFile = async (payload: UploadFilePayload) => {
  const formData = new FormData();
  formData.append("photo", payload.photo);
  const response = await instance.post("/file/upload-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fileApi = {
  uploadFile,
};
