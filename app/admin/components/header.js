// "use client";
// import { useRouter } from "next/navigation";
// import { createContext, useState, useEffect } from "react";
import Image from "next/image";
import {
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineBars3,
  HiOutlineUser,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
// import { useUser } from "@/app/auth/useUser";

import Dropdown from "@/app/admin/components/dropdown";
import ProfileMenu from "./profileMenu";
// import { useLogout } from "@/app/auth/useLogout";

// export const HeaderContext = createContext();

const Header = ({ outlet }) => {
  const img = "";
  // const [img, setImg] = useState("");
  // const { logout } = useLogout();
  // const { user } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   setImg(user?.user_metadata?.avatar_url);
  // }, [user?.user_metadata?.avatar_url]);

  return (
    // <HeaderContext.Provider value={{ setImg }}>
    <div className="lg:pl-72">
      <div className="sticky top-0 z-40 flex shrink-0 h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 ring-0 sm:px-6 lg:px-8">
        <button type="button" className="p-2.5 text-gray-700 -m-2.5 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <HiOutlineBars3 className="w-6 h-6" />
        </button>
        <div className="bg-gray-200 w-px h-6 lg:hidden" aria-hidden="true" />
        <div className="self-stretch flex flex-1 gap-x-4 lg:gap-x-6">
          <form className="flex flex-1 relative" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
            <input
              id="search-field"
              className="block w-full h-full border-0 py-0 pl-8 pr-0 text-gray-900 sm:text-sm focus:ring-0 focus:outline-none"
              placeholder="Search..."
              type="search"
              name="search"
              autoComplete="off"
            />
          </form>
          <div className="flex items-center gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400">
              <span className="sr-only">View notifications</span>
              <HiOutlineBell className="h-6 w-6" />
            </button>
            <div
              className="bg-gray-200 w-px h-6 hidden lg:block"
              aria-hidden="true"
            />
            <ProfileMenu />
          </div>
        </div>
      </div>
      <main className="py-10">
        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8">{outlet}</div>
          </div>
        </div>
      </main>
    </div>
    // </HeaderContext.Provider>
  );
};

export default Header;
