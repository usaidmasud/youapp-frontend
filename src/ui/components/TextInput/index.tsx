import React from "react";
import clsx from "clsx";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: boolean;
}

function TextInput({ placeholder, error, ...props }: TextInputProps) {
  return (
    <input
      className={clsx(
        " outline-none border-none w-full rounded-[9px] bg-[#FFFFFF0F] placeholder:text-white/40 placeholder:font-medium placeholder:text-sm placeholder:leading-[100%] placeholder:tracking-[0%] text-white text-sm font-medium leading-[100%] tracking-[0%] p-[18px] ",
        error && "ring-1 ring-red-500 focus:ring-red-500"
      )}
      {...props}
      placeholder={placeholder}
    />
  );
}

export default React.memo(TextInput);
