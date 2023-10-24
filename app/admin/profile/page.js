import ProfileForm from "@/app/admin/profile/profileForm";
import ResetPassForm from "@/app/admin/profile/resetPassForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const revalidate = 3600;

const getProfile = cache(async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  return profile;
});

const Profile = async () => {
  const profile = await getProfile();
  return (
    <div className="space-y-12">
      <ProfileForm profile={profile} />
      <ResetPassForm />
    </div>
  );
};

export default Profile;
