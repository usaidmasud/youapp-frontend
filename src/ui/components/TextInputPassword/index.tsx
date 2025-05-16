import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: boolean;
}

function TextInputPassword({ placeholder, error, ...props }: TextInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="relative">
      <input
        className={clsx(
          " outline-none border-none w-full rounded-[9px] bg-[#FFFFFF0F] placeholder:text-white/40 placeholder:font-medium placeholder:text-sm placeholder:leading-[100%] placeholder:tracking-[0%] text-white text-sm font-medium leading-[100%] tracking-[0%] p-[18px] pr-14",
          error && "ring-1 ring-red-500 focus:ring-red-500"
        )}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <button
        className="absolute end-1.5 bottom-1.5 hover:bg-white/10 p-2 rounded-full transition-colors duration-200"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <EyeIcon className="size-6 fill-white" />
      </button>
    </div>
  );
}

export default React.memo(TextInputPassword);
