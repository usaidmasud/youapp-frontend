"use client";
import { useCreateProfile } from "@/hooks/profile/useCreateProfile";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import PageHeader from "@/ui/components/PageHeader";
import SelectInputTag from "@/ui/components/SelectInputTag";
import MainLayout from "@/ui/layouts/MainLayout";
import React from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/ui/components/Spinner";

interface IOption {
  value: string;
  label: string;
}

const predefinedOptions: IOption[] = [
  { value: "Coding", label: "Coding" },
  { value: "Design", label: "Design" },
  { value: "Gaming", label: "Gaming" },
  { value: "Reading", label: "Reading" },
  { value: "Traveling", label: "Traveling" },
];

export default function InterestPage() {
  const [interests, setInterests] = React.useState<IOption[]>([]);
  const { data: user } = useGetProfile();
  const { mutateAsync: updateProfile, isPending: updatePending } =
    useUpdateProfile();
  const { mutateAsync: createProfile, isPending: createPending } =
    useCreateProfile();
  const router = useRouter();
  React.useEffect(() => {
    if (user?.profile?.interests) {
      setInterests(
        user?.profile?.interests?.map((interest) => ({
          value: interest,
          label: interest,
        })) || []
      );
    }
  }, [user?.profile?.interests]);

  const handleSave = async () => {
    if (!user?.profile) {
      await createProfile(
        {
          name: "",
          birthDate: "",
          gender: "",
          zodiac: "",
          horoscope: "",
          imageUrl: "",
          height: 0,
          weight: 0,
          interests: interests.map((interest) => interest.value),
        },
        {
          onSuccess: () => {
            router.push("/");
          },
        }
      );
    } else {
      await updateProfile(
        {
          ...user?.profile,
          interests: interests.map((interest) => interest.value),
        },
        {
          onSuccess: () => {
            router.push("/");
          },
        }
      );
    }
  };

  return (
    <MainLayout backgroundColor="gradient">
      <PageHeader
        backUrl="/"
        extra={
          <button
            type="button"
            onClick={() => handleSave()}
            className="font-medium text-xs text-linear-gradient-blue p-3"
          >
            {createPending || updatePending ? <Spinner size="sm" /> : "Save"}
          </button>
        }
      />
      <div className="">
        <p className="text-gradient-gold font-bold text-sm leading-[100%] -tracking-[0.23px]">
          Tell everyone about yourself
        </p>
        <p className="mt-3 text-white font-bold text-2xl leading-[100%] ">
          What interest you?
        </p>
        <div className="mt-9">
          <SelectInputTag
            options={predefinedOptions}
            placeholder="Select interest"
            values={interests}
            onChangeValue={(value) => {
              setInterests(value);
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}
