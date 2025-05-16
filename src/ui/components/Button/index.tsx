import clsx from "clsx";
import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function Button({ isActive, ...props }: ButtonProps) {
  return (
    <div className="relative z-40">
      <button
        disabled={!isActive}
        {...props}
        className={clsx(
          "relative w-full text-white rounded-[9px] font-bold text-base leading-[100%] tracking-[0%] p-[16px] bg-[linear-gradient(108.32deg,_#62CDCB_24.88%,_#4599DB_78.49%)] z-40",
          isActive
            ? "opacity-100 cursor-pointer"
            : "opacity-60 cursor-not-allowed"
        )}
      >
        {props.children}
      </button>

      {/* Efek blur di bawah button */}
      {isActive && (
        <div
          className="
            absolute w-full h-[48px] top-[20%] bg-[linear-gradient(108.32deg,_#62CDCB_24.88%,_#4599DB_78.49%)] opacity-40 blur-[10px] rounded-[8px] z-0
          "
        />
      )}
    </div>
  );
}

export default React.memo(Button);
