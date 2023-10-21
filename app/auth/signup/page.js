import Link from "next/link";
import { redirect } from "next/navigation";

import SignupForm from "@/app/auth/signup/signupForm";
import SocialSignin from "@/app/auth/socialSignin";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const Signup = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <>
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Create new account
      </h2>
      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <div className="bg-white shadow sm:rounded-lg sm:px-12 py-12 px-6">
          <SignupForm />
          <SocialSignin />
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account? &nbsp;&nbsp;
          <Link
            href="/auth/signin"
            className="font-semibold leading-6 text-sky-500 blf"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
