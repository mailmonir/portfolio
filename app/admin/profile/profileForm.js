"use client";
import * as yup from "yup";
import { useEffect, useState, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

import Spinner from "@/app/components/spinner";
import { GlobalContext } from "@/app/contexts/globalContext";

const schema = yup.object({
  email: yup.string().required("required").email("must be a valid email"),
  full_name: yup.string().required("required"),
  username: yup.string(),
  position: yup.string(),
  twitter_handle: yup.string(),
  website: yup.string(),
  bio: yup.string(),
});

const ProfileForm = ({ profile }) => {
  const supabase = createClientComponentClient();
  const [image, setImage] = useState("");
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitting },
  } = useForm({
    defaultValues: profile,
    resolver: yupResolver(schema),
  });

  const handleImageFileChange = (e) => {
    e.target.files[0] && setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (formData) => {
    const imageName =
      typeof formData?.avatar_url[0] === "object"
        ? `${Math.random()}-${formData.avatar_url[0].name}`
        : "";
    const imagePath =
      imageName &&
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${imageName}`;

    let imageFileToUpload = "";

    if (imagePath) {
      imageFileToUpload = formData.avatar_url[0];
      formData.avatar_url = imagePath;
    } else {
      formData.avatar_url = profile.avatar_url;
    }

    await supabase.from("profiles").upsert(formData).select();

    if (imageName) {
      await supabase.storage
        .from("avatars")
        .upload(imageName, imageFileToUpload);

      const imageNameSplited = profile.avatar_url.split("/");
      const imgName = imageNameSplited[imageNameSplited.length - 1];

      await supabase.storage.from("avatars").remove([imgName]);

      setGlobalState((prev) => ({ ...prev, avatar_url: image }));
      reset();
    }

    toast.success("Profile updated successfully");
  };

  useEffect(() => {
    !image && setImage(profile?.avatar_url);
  }, [profile?.avatar_url, image]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Profile
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Update profile details here and click save
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  disabled
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.username?.message}
              </p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="full_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("full_name")}
                  type="text"
                  name="full_name"
                  id="full_name"
                  autoComplete="full_name"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.full_name?.message}
              </p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="position"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Position
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("position")}
                  type="text"
                  name="position"
                  id="position"
                  autoComplete="position"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.position?.message}
              </p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="twitter_handle"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Twitter handle
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("twitter_handle")}
                  type="text"
                  name="twitter_handle"
                  id="twitter_handle"
                  autoComplete="twitter_handle"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.twitter_handle?.message}
              </p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Website
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("website")}
                  type="text"
                  name="website"
                  id="website"
                  autoComplete="website"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.website?.message}
              </p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="bio"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bio
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <textarea
                  {...register("bio")}
                  id="bio"
                  name="bio"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="text-sm text-red-400 mt-1">{errors.bio?.message}</p>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="avatar_url"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Avatar
              <br />
              <div className="mt-2 inline-flex items-center gap-x-3 cursor-pointer">
                {image ? (
                  <Image
                    src={image}
                    className="h-12 w-12 rounded-full"
                    alt="profile picture"
                    width={200}
                    height={200}
                  />
                ) : (
                  <svg
                    className="h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span
                  type="button"
                  className="rounded-md bg-white px-3.5 py-2.5 cursor-pointer text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </span>
                <input
                  {...register("avatar_url", {
                    onChange: handleImageFileChange,
                  })}
                  accept="image/*"
                  id="avatar_url"
                  name="avatar_url"
                  type="file"
                  className="sr-only"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isDirty ? "visible" : "invisible"
          } flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Save
          {isSubmitting && (
            <Spinner sizeClasses="w-4 h-4" textColorClass="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
