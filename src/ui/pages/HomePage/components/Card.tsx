import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
}
function Card({ title, children, extra }: CardProps) {
  return (
    <div className="w-full  rounded-[14px] bg-[#0E191F] px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-white text-sm font-bold leading-[100%] -tracking-[0.23px]">
          {title}
        </p>
        {extra}
      </div>

      <div className="mt-8 w-full">{children}</div>
    </div>
  );
}

export default React.memo(Card);
