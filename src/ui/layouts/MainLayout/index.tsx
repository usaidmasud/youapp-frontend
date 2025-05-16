"use client";
import React, { useEffect } from "react";
import ProtectedLayout from "../ProtectedLayout";
import { SocketProvider, useSocket } from "@/libs/socket/SocketProvider";
import toast from "react-hot-toast";

interface MainLayoutProps {
  children: React.ReactNode;
  backgroundColor?: "solid" | "gradient";
}
export default function MainLayout({
  children,
  backgroundColor = "solid",
}: MainLayoutProps) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", () => {
      toast.success("You have a new message");
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);
  return (
    <ProtectedLayout>
      <div
        className={`relative flex min-h-screen w-full max-w-md mx-auto p-5 pb-24 ${
          backgroundColor === "solid" ? "bg-[#09141A]" : "bg-linear-gradient"
        }`}
      >
        <div className="w-full">{children}</div>
      </div>
    </ProtectedLayout>
  );
}
