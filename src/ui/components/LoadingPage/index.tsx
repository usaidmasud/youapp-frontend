import React from "react";
import Spinner from "../Spinner";

export default function LoadingPage() {
  return (
    <div
      className={`flex min-h-screen justify-center items-center flex-col w-full max-w-md mx-auto p-5 bg-[#09141A]`}
    >
      <Spinner size="lg" />
      <p className="mt-4 text-white text-sm font-medium leading-[100%] tracking-[0%]">
        Loading
      </p>
    </div>
  );
}
