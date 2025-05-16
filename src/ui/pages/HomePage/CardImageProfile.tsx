import { UserResponse } from "@/types/user.model";
import { HOROSCOPE_SYMBOL } from "@/utils/constants/horoscope.sign";
import { ZODIAC_SYMBOL } from "@/utils/constants/zodiac.constant";
import { getAge } from "@/utils/getAge";
import { getImage } from "@/utils/getImage";
import Image from "next/image";

interface CardImageProfileProps {
  user: UserResponse;
}
export default function CardImageProfile({ user }: CardImageProfileProps) {
  return (
    <div className="relative w-full h-[190px] bg-[#162329] rounded-2xl overflow-hidden px-7 py-3">
      {/* overlay */}
      <div className=" overlay-linear-gradient absolute inset-0 z-10"></div>
      {user?.profile?.imageUrl && (
        <Image
          src={getImage(user?.profile?.imageUrl)}
          alt="profile"
          fill
          className="object-cover bg-[#D9D9D9]"
        />
      )}
      <div className="absolute bottom-4 left-4 z-20">
        <p className="text-white text-base font-bold leading-[100%] -tracking-[0.23px] mb-2">
          @
          {user?.profile?.name && user?.profile?.name !== ""
            ? user?.profile?.name
            : user?.username}
          ,{user?.profile?.birthDate && getAge(user?.profile?.birthDate)}
        </p>
        <p className="font-medium text-sm text-white">
          {user?.profile?.gender}
        </p>
        {user?.profile?.horoscope && (
          <div className="mt-3 flex gap-3 items-center">
            <span className="px-4 py-2 backdrop-blur-custom bg-white/[6%] rounded-full  text-white font-semibold text-sm">
              {
                HOROSCOPE_SYMBOL.find(
                  (item) => item.sign === user?.profile?.horoscope
                )?.unicode
              }
              &nbsp;
              {user?.profile?.horoscope}
            </span>
            <span className="px-4 py-2 backdrop-blur-custom bg-white/[6%] rounded-full  text-white font-semibold text-sm">
              {
                ZODIAC_SYMBOL.find(
                  (item) => item.sign === user?.profile?.zodiac
                )?.unicode
              }
              &nbsp;
              {user?.profile?.zodiac}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
