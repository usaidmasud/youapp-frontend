import { LoginPayload } from "../../../types/auth.model";
import Button from "@/ui/components/Button";
import TextInput from "@/ui/components/TextInput";
import TextInputPassword from "@/ui/components/TextInputPassword";
import AuthLayout from "@/ui/layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "./schemas/login.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/ui/components/Spinner";
import FormGroupLogin from "@/ui/components/FormGroupLogin";
import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/ui/components/PageHeader";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginPayload) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      ...data,
    });
    setIsLoading(false);

    if (response?.error) {
      toast.error("Login failed");
      return;
    }
    if (response?.url) {
      router.push(response.url);
    }
  };

  return (
    <AuthLayout
      title="Login"
      footerText="login"
      footerLink="/auth/register"
      backUrl="/auth/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <Controller
          name="usernameOrEmail"
          control={control}
          render={({ field }) => (
            <FormGroupLogin error={errors.usernameOrEmail?.message}>
              <TextInput placeholder="Enter Username/Email" {...field} />
            </FormGroupLogin>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormGroupLogin error={errors.password?.message}>
              <TextInputPassword placeholder="Enter Password" {...field} />
            </FormGroupLogin>
          )}
        />
        <div className="mt-2">
          <Button isActive={isValid}>
            {isLoading ? <Spinner /> : "Login"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
