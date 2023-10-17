import Link from "next/link";
import { redirect } from "next/navigation";

import ResetPassForm from "@/app/auth/reset-password/resetPassForm";
import supabaseServer from "@/app/components/supabaseServer";

const ResetPassword = async () => {
  const { data } = await supabaseServer().auth.getSession();

  if (data?.session) {
    redirect("/");
  }

  return (
    <>
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Reset password
      </h2>

      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <div className="bg-white shadow sm:rounded-lg sm:px-12 py-12 px-6">
          <ResetPassForm />
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Go back to &nbsp;&nbsp;
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

export default ResetPassword;
