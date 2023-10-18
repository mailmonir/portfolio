import Header from "@/app/admin/components/header";
import Sidebar from "@/app/admin/components/sidebar";

const AdminLayout = async ({ children }) => {
  return (
    <>
      <Header outlet={children} />
      <Sidebar />
    </>
  );
};

export default AdminLayout;
