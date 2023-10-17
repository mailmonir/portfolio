"use client";

import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Spinner from "@/app/components/spinner";
import ShowMessage from "@/app/components/showMessage";

const schema = yup.object({
  email: yup.string().required("required").email("must be a valid email"),
  password: yup.string().required("required"),
});

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
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
        message: "Sign in successful",
      });
    }

    setIsLoading(false);
    router.replace("/admin");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <ShowMessage errors={errors} reset={reset} />
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
            defaultValue="pushpitaislam2008@gmail.com"
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
            defaultValue="pushpita"
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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="bnr rounded w-4 h-4 text-sky-500 border-gray-300"
          />
          <label
            htmlFor="remember-me"
            className="block text-sm font-medium leading-6 text-gray-900 ml-3"
          >
            Remember me
          </label>
        </div>
        <div className="leading-6 text-sm">
          <Link
            href="/auth/reset-password"
            className="font-semibold text-sky-500 hover:text-sky-400"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="flex w-full justify-center items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Sign in &nbsp; &nbsp;
          {isLoading && (
            <Spinner sizeClasses="w-4 h-4" textColorClass="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
