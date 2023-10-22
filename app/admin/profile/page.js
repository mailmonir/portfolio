import ProfileForm from "@/app/admin/profile/profileForm";
import ResetPassForm from "@/app/admin/profile/resetPassForm";
// import { getServerSession } from "@/app/lib/checkSessionServer";

const Profile = async () => {
  //   const session = await getServerSession();
  return (
    <div className="space-y-12">
      {/* <ProfileForm session={session} /> */}
      {/* <ResetPassForm /> */}
    </div>
  );
};

export default Profile;
