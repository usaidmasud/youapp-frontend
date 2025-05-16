import clsx from "clsx";
import React from "react";

interface TextInputOutlineProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  loading?: boolean;
  align?: "left" | "right";
}

function TextInputOutline({
  suffix,
  loading,
  align = "right",
  ...props
}: TextInputOutlineProps) {
  return (
    <div className="relative">
      <input
        type="text"
        className={clsx(
          "outline-none border border-white/20 rounded-lg bg-[#D9D9D90F] text-sm font-medium  px-5 py-2.5 text-white placeholder:text-white/30 placeholder:font-medium placeholder:text-sm placeholder:leading-[100%] placeholder:tracking-[0%] w-full disabled:text-white/30",
          suffix && "pr-12 placeholder:pr-2",
          align === "left" ? "text-left" : "text-right"
        )}
        {...props}
      />
      {suffix && (
        <span
          className={clsx(
            "absolute  right-5 top-2 text-white",
            align === "left" ? "left-5" : "right-5"
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

export default React.memo(TextInputOutline);
