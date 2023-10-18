"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ navItem, classes }) => {
  const pathname = usePathname();
  return (
    <li className={classes}>
      <Link
        href={navItem.path}
        className={` ${
          pathname === navItem.path ? "text-sky-500 bg-gray-50" : ""
        } leading-6 font-semibold text-sm p-2 rounded-md gap-x-3 flex hover:text-sky-500 hover:bg-gray-50`}
      >
        {navItem.icon}
        {navItem.label}
      </Link>
    </li>
  );
};

export default NavItem;
