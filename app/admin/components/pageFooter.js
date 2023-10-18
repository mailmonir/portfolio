// import { useRouter } from "next/navigation";
// import Button from "../components/button";

const PageFooter = ({ children }) => {
  // const router = useRouter();
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6 border-t py-6">
      {children}
    </div>
  );
};

export default PageFooter;
