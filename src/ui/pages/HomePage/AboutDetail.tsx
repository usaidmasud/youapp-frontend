import dayjs from "dayjs";
import { ProfileResponse } from "@/types/profile.model";
import { getAge } from "@/utils/getAge";
import React from "react";

interface AboutDetailProps {
  profile: ProfileResponse;
}
function AboutDetail({ profile }: AboutDetailProps) {
  const details = [
    {
      label: "Birthday",
      value:
        profile.birthDate && profile.birthDate !== ""
          ? dayjs(profile.birthDate).format("DD / MM / YYYY") +
            " (Age " +
            getAge(profile.birthDate) +
            ")"
          : "",
    },
    {
      label: "Horoscope",
      value:
        profile.horoscope && profile.horoscope !== "" ? profile.horoscope : "",
    },
    {
      label: "Zodiac",
      value: profile.zodiac && profile.zodiac !== "" ? profile.zodiac : "",
    },
    {
      label: "Height",
      value: profile.height !== 0 ? profile.height + " cm" : "",
    },
    {
      label: "Weight",
      value: profile.weight !== 0 ? profile.weight + " kg" : "",
    },
  ];
  return (
    <ul className="flex flex-col gap-4">
      {details.map((detail, index) => (
        <li key={index} className="flex items-center gap-1">
          <p className="text-white/35 text-sm font-medium leading-[100%] -tracking-[0.23px]">
            {detail.label}:
          </p>
          <p className="text-white text-sm font-medium leading-[100%] -tracking-[0.23px]">
            {detail.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(AboutDetail);
