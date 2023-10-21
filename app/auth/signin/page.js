import Link from "next/link";
import { redirect } from "next/navigation";

import SigninForm from "@/app/auth/signin/signinForm";
import SocialSignin from "@/app/auth/socialSignin";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const Signin = async () => {
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
        Sign in to your account
      </h2>
      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <div className="bg-white shadow sm:rounded-lg sm:px-12 py-12 px-6">
          <SigninForm />
          <SocialSignin />
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;&nbsp;
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-sky-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signin;
