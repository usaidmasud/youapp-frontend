import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import React from "react";

interface PageHeaderProps {
  title?: string;
  extra?: React.ReactNode;
  hideBack?: boolean;
  backUrl?: string;
}
function PageHeader({ title, extra, hideBack, backUrl }: PageHeaderProps) {
  const router = useRouter();
  const backHandle = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };
  return (
    <div className="flex justify-between items-center my-9">
      <div className="-ml-2 flex items-center gap-0 ">
        {!hideBack && (
          <button
            onClick={backHandle}
            className="text-white text-sm font-bold leading-[100%] tracking-[0%] flex items-center gap-1"
          >
            <ChevronLeftIcon className="size-6 fill-white" /> Back
          </button>
        )}
      </div>
      <div className="">
        {title && (
          <h1 className="text-white text-sm font-bold leading-[100%] tracking-[0%]">
            {title}
          </h1>
        )}
      </div>
      <div className="">{extra}</div>
    </div>
  );
}

export default React.memo(PageHeader);
