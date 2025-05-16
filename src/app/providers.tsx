"use client";
import React from "react";
import ReduxProvider from "@/libs/redux/ReduxProvider";
import NextAuthProvider from "@/libs/next-auth/NextAuthProvider";
import ReactQueryProvider from "@/libs/react-query/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/libs/socket/SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <NextAuthProvider>
        <SocketProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SocketProvider>
      </NextAuthProvider>
      <Toaster position="top-center" />
    </ReduxProvider>
  );
}
