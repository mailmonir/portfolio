"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { useState } from "react";
import slugify from "slugify";

const SocialSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const oAuthSignIn = async (provider) => {
    setIsLoading(true);
    let { error } = await supabase.auth.signInWithOAuth({
      ...provider,
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });

    if (error) {
      console.log(error);
      throw new Error("Oauth signup failed");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="mt-10 relative">
        <div className="flex items-center inset-0 absolute" aria-hidden="true">
          <div className="bg-gray-200 border-t w-full" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-white px-6 text-gray-900">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => oAuthSignIn({ provider: "google" })}
          disabled={isLoading}
          className="text-white py-1.5 px-3 rounded-md bg-[#DB4437] gap-3 justify-center items-center w-full flex"
        >
          <FaGoogle className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm leading-6">Google</span>
        </button>
        <button
          onClick={() => oAuthSignIn({ provider: "github" })}
          disabled={isLoading}
          className="text-white py-1.5 px-3 rounded-md bg-[rgb(36,41,47)] gap-3 justify-center items-center w-full flex"
        >
          <FaGithub className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm leading-6">GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialSignin;
