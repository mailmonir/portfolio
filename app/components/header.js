"use client";

import { useState, useEffect } from "react";
import { HiOutlineXMark, HiOutlineBars3 } from "react-icons/hi2";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Logo from "./logo";
import LinkButton from "./linkButton";
import IconButton from "./iconButton";
import NavLinks from "./navLinks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user);
    };
    getUser();
  }, [supabase]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <IconButton
            classes="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            text="Open main menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiOutlineBars3 className="w-6 h-6 hover:text-gray-500" />
          </IconButton>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLinks classes="text-sm font-semibold leading-6 text-gray-900" />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LinkButton
            classes="text-sm font-semibold leading-6 text-gray-900"
            link={user?.role === "authenticated" ? "/admin" : "/auth/signin"}
          >
            {user?.role === "authenticated" ? "Dashboard" : "Sign in"}{" "}
            <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div className="lg:hidden" role="dialog" aria-modal="true">
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className={`${!isMenuOpen ? "hidden" : ""} fixed inset-0 z-50`} />
        <div
          className={`${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-[385px] opacity-0"
          } transform transition duration-300 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <IconButton
              text="Close menu"
              classes="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiOutlineXMark className="w-6 h-6 hover:text-gray-500" />
            </IconButton>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLinks classes="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" />
              </div>
              <div className="py-6">
                <LinkButton
                  classes="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  link={
                    user?.role === "authenticated" ? "/admin" : "/auth/signin"
                  }
                >
                  {user?.role === "authenticated" ? "Dashboard" : "Sign in"}
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
