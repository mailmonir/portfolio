import ProfileForm from "@/app/admin/profile/profileForm";
import ResetPassForm from "@/app/admin/profile/resetPassForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Profile = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  return (
    <div className="space-y-12">
      <ProfileForm profile={profile} />
      <ResetPassForm />
    </div>
  );
};

export default Profile;
