import React from "react";

interface FormGroupProps {
  error?: string;
  children: React.ReactNode;
}

function FormGroupLogin({ error, children }: FormGroupProps) {
  return (
    <div className="w-full mb-4">
      <div className="">{children}</div>
      {error && (
        <div className="mt-1 ml-2">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(FormGroupLogin);
