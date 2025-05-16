import React from "react";
import clsx from "clsx";

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

function FormGroup({ label, children, error, className }: FormGroupProps) {
  return (
    <div className={clsx("flex items-center gap-2 w-full ", className)}>
      <div className="w-1/3">
        <label className="text-white text-sm font-medium text-white/35 leading-[100%] -tracking-[0.23px]">
          {label} :
        </label>
      </div>
      <div className="flex-1">
        {children}
        {error && (
          <div className="mt-1 ml-2">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(FormGroup);
