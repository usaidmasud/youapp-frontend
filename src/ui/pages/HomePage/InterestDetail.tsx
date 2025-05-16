import { ProfileResponse } from "@/types/profile.model";
import { useRouter } from "next/navigation";
import React from "react";

interface InterestDetailProps {
  profile?: ProfileResponse;
}
function InterestDetail({ profile }: InterestDetailProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {profile?.interests?.map((item, index) => (
        <p
          className="rounded-full px-4 py-2 bg-white/5 text-white text-sm font-semibold text-center "
          key={index}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default React.memo(InterestDetail);
