"use client";
import * as yup from "yup";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Spinner from "@/app/components/spinner";

const schema = yup.object({
  password: yup.string().required("required").min(6, "at least 6 charecters"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const supabase = createClientComponentClient();
    await supabase.auth.updateUser({ password: data.password });
    toast.success("Password reset successful. Please re-login.");
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Update password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Enter new password, confirm new password and click save to update
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.password?.message}
              </p>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm new password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register("passwordConfirmation")}
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-sm text-red-400 mt-1">
                {errors.passwordConfirmation?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isDirty ? "visible" : "invisible"
          } flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          Save{" "}
          {isSubmitting && (
            <Spinner sizeClasses="w-4 h-4" textColorClass="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ResetPassForm;
