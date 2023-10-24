"use client";

import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import slugify from "slugify";

import Spinner from "@/app/components/spinner";
import ShowMessage from "@/app/components/showMessage";

const schema = yup.object({
  name: yup.string().required("required"),
  email: yup.string().required("required").email("must be a valid email"),
  password: yup.string().required("required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = () => {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/signin`,
        data: {
          full_name: data.name,
          avatar_url: "",
          slug: slugify(data.name, { replacement: "_", lower: true }),
        },
      },
    });

    if (error) {
      setError("serverError", {
        type: "custom",
        message: error.message,
      });
    } else {
      reset();
      setError("successMsg", {
        type: "custom",
        message:
          "Success! We've send a confirmation link to your account. Please click the link to login.",
      });

      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <ShowMessage errors={errors} reset={reset} />

      <div>
        <label
          htmlFor="name"
          className="text-gray-900 leading-6 font-medium block text-sm"
        >
          Full name
        </label>
        <div className="mt-2">
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
          />
          <p className="text-sm text-red-400 mt-1">{errors.name?.message}</p>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-gray-900 leading-6 font-medium block text-sm"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            {...register("email")}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
          />
          <p className="text-sm text-red-400 mt-1">{errors.email?.message}</p>
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-gray-900 leading-6 font-medium block text-sm"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
          />
          <p className="text-sm text-red-400 mt-1">
            {errors.password?.message}
          </p>
        </div>
      </div>
      <div>
        <label
          htmlFor="passwordConfirmation"
          className="text-gray-900 leading-6 font-medium block text-sm"
        >
          Password confirmation
        </label>
        <div className="mt-2">
          <input
            {...register("passwordConfirmation")}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
          />
          <p className="text-sm text-red-400 mt-1">
            {errors.passwordConfirmation?.message}
          </p>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="flex w-full justify-center items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Sign up &nbsp; &nbsp;
          {isLoading && (
            <Spinner sizeClasses="w-4 h-4" textColorClass="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
