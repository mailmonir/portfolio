import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

import NavItem from "./navItem";

const navItems = [
  {
    id: 1,
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineHome className="h-5 w-5 text-gray-400" />,
  },
  {
    id: 2,
    label: "Bookings",
    path: "/admin/bookings",
    icon: <HiOutlineCalendar className="h-5 w-5 text-gray-400" />,
  },
  {
    id: 3,
    label: "Cabins",
    path: "/admin/cabins",
    icon: <HiOutlineHomeModern className="h-5 w-5 text-gray-400" />,
  },
  {
    id: 4,
    label: "Users",
    path: "/admin/users",
    icon: <HiOutlineUsers className="h-5 w-5 text-gray-400" />,
  },
];

const settingsItem = {
  id: 5,
  label: "settings",
  path: "/admin/settings",
  icon: <HiOutlineCog6Tooth className="h-5 w-5 text-gray-400" />,
};

const Sidebar = () => {
  return (
    <div className="hidden lg:w-72 lg:fixed lg:flex lg:flex-col lg:inset-y-0 z-40">
      <div className="flex flex-col grow px-6 pb-4 overflow-y-auto gap-y-5 bg-white border-r border-gray-200">
        <div className="flex shrink-0 items-center justify-center h-16">
          <Link href="/">
            <Image
              src="/next.svg"
              alt="logo the wild oasis"
              height={100}
              width={100}
              className="w-auto h-6"
              priority={true}
            />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" className="-mx-2 abo">
                {navItems.map((navItem) => (
                  <NavItem key={navItem.id} navItem={navItem} />
                ))}
              </ul>
            </li>
            <NavItem navItem={settingsItem} classes="mt-auto" />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
