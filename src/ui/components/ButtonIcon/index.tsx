import React from "react";
import { ButtonHTMLAttributes } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
function ButtonIcon({ ...props }: ButtonIconProps) {
  return (
    <button
      className="cursor-pointer hover:bg-gray-500/10 rounded-full p-2"
      {...props}
    >
      {props.children}
    </button>
  );
}

export default React.memo(ButtonIcon);
