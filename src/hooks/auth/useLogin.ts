import { authApi } from "@/libs/api/auth.api";
import { LoginPayload } from "../../types/auth.model";
import { useMutation } from "@tanstack/react-query";

export const useLogin = (payload: LoginPayload) => {
  return useMutation({
    mutationFn: () => authApi.login(payload),
  });
};
