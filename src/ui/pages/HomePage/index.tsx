"use client";
import { useCreateProfile } from "@/hooks/profile/useCreateProfile";
import { useGetAstrology } from "@/hooks/profile/useGetAstrology";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { CreateProfilePayload } from "@/types/profile.model";
import ButtonIcon from "@/ui/components/ButtonIcon";
import DatePickerInput from "@/ui/components/DatePickerInput";
import FormGroup from "@/ui/components/FormGroup";
import PageHeader from "@/ui/components/PageHeader";
import SelectInput from "@/ui/components/SelectInput";
import Spinner from "@/ui/components/Spinner";
import TextInputOutline from "@/ui/components/TextInputOutline";
import MainLayout from "@/ui/layouts/MainLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import AboutDetail from "./AboutDetail";
import CardImageProfile from "./CardImageProfile";
import Card from "./components/Card";
import UploadFoto from "./components/UploadFoto";
import { createProfileSchema } from "./schemas/create-profile.schema";
import InterestDetail from "./InterestDetail";
import { useUploadProfile } from "@/hooks/file/useUploadProfile";
import { getImage } from "@/utils/getImage";
import { genderOptions } from "@/utils/constants/gender.option.constant";
import { signOut } from "next-auth/react";
import DropdownMenu from "@/ui/components/DropdownMenu";

export default function HomePage() {
  const [editAbout, setEditAbout] = React.useState<boolean>(false);
  const router = useRouter();
  const [filePhoto, setFilePhoto] = React.useState<File | null>(null);
  const { data: user } = useGetProfile();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreateProfilePayload>({
    resolver: zodResolver(createProfileSchema),
    mode: "onChange",
  });

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const handleImageUpload = (file: File | null) => {
    if (file) {
      setFilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePhoto(null);
      setImagePreview(null);
    }
  };
  React.useEffect(() => {
    if (user?.profile) {
      reset({
        name: user.profile.name,
        birthDate: user.profile.birthDate,
        gender: user.profile.gender,
        zodiac: user.profile.zodiac,
        horoscope: user.profile.horoscope,
        imageUrl: user.profile.imageUrl,
        height: user.profile.height,
        weight: user.profile.weight,
        interests: user.profile.interests,
      });
    } else {
      reset({
        name: "",
        birthDate: "",
        gender: "",
        zodiac: "",
        horoscope: "",
        imageUrl: "",
        height: 0,
        weight: 0,
        interests: [],
      });
    }
  }, [user, reset]);

  const { mutateAsync: createProfile, isPending: createPending } =
    useCreateProfile();
  const { mutateAsync: updateProfile, isPending: updatePending } =
    useUpdateProfile();

  const { mutateAsync: uploadFile } = useUploadProfile();
  const { mutateAsync: getAstrology, isPending: getAstrologyPending } =
    useGetAstrology();
  const onSubmit = async (data: CreateProfilePayload) => {
    let dataCopy = { ...data };

    if (filePhoto) {
      const res = await uploadFile({
        photo: filePhoto,
      });
      dataCopy.imageUrl = res.filename;
    }
    if (user?.profile) {
      await updateProfile(dataCopy, {
        onSuccess: () => {
          setEditAbout(false);
        },
      });
    } else {
      await createProfile(dataCopy, {
        onSuccess: () => {
          setEditAbout(false);
        },
      });
    }
  };

  const triggerSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: false,
    });
    router.push("/auth/login");
  };

  return (
    <MainLayout>
      <PageHeader
        hideBack
        backUrl="/"
        extra={
          <DropdownMenu
            trigger={
              <ButtonIcon onClick={handleLogout}>
                <Image
                  src="/assets/icons/ellipsis.svg"
                  alt="ellipsis"
                  width={24}
                  height={24}
                />
              </ButtonIcon>
            }
            menuItems={[
              {
                label: "Chat",
                onClick: () => {
                  router.push("/chat");
                },
              },
              {
                label: "Logout",
                onClick: handleLogout,
              },
            ]}
          />
        }
      />
      <CardImageProfile user={user!} />
      <div className="mt-[24px]"></div>
      <Card
        title="About"
        extra={
          <Fragment>
            {editAbout && (
              <button
                onClick={() => {
                  triggerSubmit();
                }}
                className="font-medium text-xs text-gradient-gold p-3"
              >
                {createPending || updatePending ? (
                  <Spinner size="sm" />
                ) : (
                  "Save & Update"
                )}
              </button>
            )}
            {!editAbout && (
              <ButtonIcon
                onClick={() => setEditAbout(!editAbout)}
                className="p-3 hover:bg-gray-500/10 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <Image
                  src="/assets/icons/edit-2.svg"
                  alt="edit"
                  width={17}
                  height={17}
                />
              </ButtonIcon>
            )}
          </Fragment>
        }
      >
        {!editAbout &&
          (user?.profile && user?.profile?.name ? (
            <AboutDetail profile={user?.profile!} />
          ) : (
            <p className="text-white/50 text-sm font-medium leading-[100%]">
              Add in your your about to help others know you better
            </p>
          ))}
        {editAbout && (
          <div>
            <UploadFoto
              onImageChange={(file) => {
                handleImageUpload(file);
              }}
              imageUrl={
                user?.profile?.imageUrl
                  ? getImage(user?.profile.imageUrl)
                  : imagePreview!
              }
            />
            <form className="flex flex-col gap-3 mt-7">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormGroup label="Display name" error={errors.name?.message}>
                    <TextInputOutline
                      placeholder="Display Name"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormGroup label="Gender" error={errors.gender?.message}>
                    <SelectInput
                      options={genderOptions}
                      placeholder="Gender"
                      value={genderOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <FormGroup label="Birthday" error={errors.birthDate?.message}>
                    <DatePickerInput
                      value={field.value ? dayjs(field.value).toDate() : null}
                      onChange={(value) => {
                        field.onChange(dayjs(value).format("YYYY-MM-DD"));
                        getAstrology({
                          birthDate: dayjs(value).format("YYYY-MM-DD"),
                        })
                          .then((res) => {
                            setValue("zodiac", res.zodiac);
                            setValue("horoscope", res.horoscopes);
                          })
                          .catch((err) => {});
                      }}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name="horoscope"
                control={control}
                render={({ field }) => (
                  <FormGroup
                    label="Horoscope"
                    error={errors.horoscope?.message}
                  >
                    <TextInputOutline
                      disabled
                      placeholder="Horoscope"
                      value={getAstrologyPending ? "Loading..." : field.value}
                      onChange={field.onChange}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name="zodiac"
                control={control}
                render={({ field }) => (
                  <FormGroup label="Zodiac" error={errors.zodiac?.message}>
                    <TextInputOutline
                      disabled
                      placeholder="Zodiac"
                      value={getAstrologyPending ? "Loading..." : field.value}
                      onChange={field.onChange}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <FormGroup label="Height" error={errors.height?.message}>
                    <TextInputOutline
                      type="number"
                      placeholder="Height"
                      suffix="cm"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <FormGroup label="Weight" error={errors.weight?.message}>
                    <TextInputOutline
                      type="number"
                      placeholder="Weight"
                      suffix="kg"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormGroup>
                )}
              />
            </form>
          </div>
        )}
      </Card>
      <div className="mt-[18px]"></div>
      <Card
        title="Interests"
        // description="Add in your interests to find a better match"
        // isFilled={!!user?.profile?.interests?.length}
        extra={
          <ButtonIcon
            onClick={() => {
              router.push("/profile/interest");
            }}
            className="p-3 hover:bg-gray-500/10 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <Image
              src="/assets/icons/edit-2.svg"
              alt="edit"
              width={17}
              height={17}
            />
          </ButtonIcon>
        }
      >
        <InterestDetail profile={user?.profile!} />
      </Card>
    </MainLayout>
  );
}
