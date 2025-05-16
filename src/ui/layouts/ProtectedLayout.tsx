"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";
import Spinner from "../components/Spinner";
import LoadingPage from "../components/LoadingPage";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const authorized = status === "authenticated";
  const unAuthorized = status === "unauthenticated";
  const loading = status === "loading";

  useEffect(() => {
    if (loading || !router) return;
    if (unAuthorized) {
      router.push("/auth/login");
    }
  }, [authorized, unAuthorized, loading, router]);

  if (loading) return <LoadingPage />;

  return <Fragment>{children}</Fragment>;
}

export default React.memo(ProtectedLayout);
