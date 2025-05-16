import { authApi } from "@/libs/api/auth.api";
import { RegisterPayload } from "../../types/auth.model";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onMutate: () => {
      toast.loading("Registering...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Register successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.message ?? "Register failed");
    },
  });
};
