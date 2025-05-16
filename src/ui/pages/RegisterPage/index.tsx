"use client";
import { useRegister } from "@/hooks/auth/useRegister";
import Button from "@/ui/components/Button";
import FormGroupLogin from "@/ui/components/FormGroupLogin";
import Spinner from "@/ui/components/Spinner";
import TextInput from "@/ui/components/TextInput";
import TextInputPassword from "@/ui/components/TextInputPassword";
import AuthLayout from "@/ui/layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { RegisterPayload } from "../../../types/auth.model";
import { registerSchema } from "./schemas/register.schema";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();

  const onSubmit = async (data: RegisterPayload) => {
    await register(data, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };

  useEffect(() => {
    reset({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [reset]);

  return (
    <AuthLayout title="Register" footerText="register" footerLink="/auth/login">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormGroupLogin error={errors.email?.message}>
              <TextInput
                error={!!errors.email?.message}
                placeholder="Enter Email"
                {...field}
              />
            </FormGroupLogin>
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FormGroupLogin error={errors.username?.message}>
              <TextInput
                error={!!errors.username?.message}
                placeholder="Create Username"
                {...field}
              />
            </FormGroupLogin>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormGroupLogin error={errors.password?.message}>
              <TextInputPassword
                error={!!errors.password?.message}
                placeholder="Create Password"
                {...field}
              />
            </FormGroupLogin>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormGroupLogin error={errors.confirmPassword?.message}>
              <TextInputPassword
                error={!!errors.confirmPassword?.message}
                placeholder="Confirm Password"
                {...field}
              />
            </FormGroupLogin>
          )}
        />
        <div className="mt-2">
          <Button isActive={isValid}>
            {isRegisterPending ? <Spinner /> : "Register"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
