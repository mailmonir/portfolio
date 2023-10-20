import Link from "next/link";
import { redirect } from "next/navigation";

import UpdatePassForm from "@/app/auth/update-password/updatePassForm";
import supabaseServer from "@/app/components/supabaseServer";

const UpdatePassword = async () => {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Set new password
      </h2>

      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <div className="bg-white shadow sm:rounded-lg sm:px-12 py-12 px-6">
          <UpdatePassForm />
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

export default UpdatePassword;
