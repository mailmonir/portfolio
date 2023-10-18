"use client";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { verifyCaptchaAction } from "@/app/lib/verifyRecaptcha";
import sendMail from "@/app/lib/sendMail";
import Spinner from "@/app/components/spinner";
import ShowMessage from "@/app/components/showMessage";

const schema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required").email("must be a valid email"),
  message: yup.string().required("required"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  // initialises the powerful hook that is in charge of executing the
  // reCAPTCHA behind the scenes.
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // if the component is not mounted yet
    if (!executeRecaptcha) {
      return;
    }
    // receive a token
    const token = await executeRecaptcha("onSubmit");
    // validate the token via the server action we've created previously
    const verified = await verifyCaptchaAction(token);

    if (verified) {
      sendMail(data).then((res) => {
        if (res === "failed") {
          setError("serverError", {
            type: "custom",
            message: "There was an error. Message not sent",
          });
          setIsLoading(false);
        } else if (res.messageId) {
          reset();
          setError("successMsg", {
            type: "custom",
            message: "Message submitted successfully",
          });
          setIsLoading(false);
        } else {
          setError("serverError", {
            type: "custom",
            message: "Failed!",
          });
          setIsLoading(false);
        }
      });
    } else {
      setError("serverError", {
        type: "custom",
        message: "There was an error. Message not sent",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-16 max-w-xl sm:mt-20"
    >
      <ShowMessage errors={errors} reset={reset} />
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mt-8">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
              {...register("firstName")}
            />
            <p className="text-sm text-red-400 mt-1">
              {errors.firstName?.message}
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
              {...register("lastName")}
            />
            <p className="text-sm text-red-400 mt-1">
              {errors.lastName?.message}
            </p>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
              {...register("email")}
            />
            <p className="text-sm text-red-400 mt-1">{errors.email?.message}</p>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
              {...register("message")}
            />

            <p className="text-sm text-red-400 mt-1">
              {errors.message?.message}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="flex justify-center items-center w-full rounded-md bg-sky-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Submit message &nbsp; &nbsp;
          {isLoading ? <Spinner sizeClasses="w-4 h-4" /> : ""}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
