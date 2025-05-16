import PageHeader from "@/ui/components/PageHeader";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  footerText?: "login" | "register";
  footerLink?: string;
}
export default function AuthLayout({
  children,
  title,
  footerText,
  footerLink,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen max-w-md w-full mx-auto flex-col bg-[radial-gradient(121.73%_121.49%_at_100%_-3.39%,_#1F4247_0%,_#0D1D23_56.18%,_#09141A_100%)] p-5 pb-10">
      <PageHeader hideBack />
      <div className="ml-6 mt-12">
        <h1 className="text-white text-[24px] font-bold leading-[100%] tracking-[0%]">
          {title}
        </h1>
      </div>
      <div className="w-full mt-6">{children}</div>
      <div className="mt-14">
        <p className="text-center text-white font-medium text[13px] leading-[100%] tracking-[0%]">
          {footerText === "login" ? "No account?" : "Have an account?"}
          <Link href={footerLink || ""}>
            <span className="text-[#FFC600] underline underline-offset-4 cursor-pointer">
              &nbsp;
              {footerText === "login" ? "Register here" : "Login here"}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
