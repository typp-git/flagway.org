"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { TrophyIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { FaUserPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import FlagwayLogo from "./FlagwayLogo";
import clsx from "clsx";
import DashboardNavLink from "./DashboardNavLink";

// TAILWIND UI "SIMPLE" NAVBAR

export default function Navbar() {
  const pathname = usePathname();

  const getMobileClasses = (path: string) => {
    const activeClasses: Record<string, string> = {
      "/teams":
        "block border-l-4 !border-yellow-800 bg-gray-300/10 py-2 pl-3 pr-4 text-base font-medium !text-yellow-600 rounded-tr-lg rounded-br-lg transition-all",
      "/tournaments":
        "block border-l-4 !border-red-800 bg-gray-300/10 py-2 pl-3 pr-4 text-base font-medium !text-red-700 rounded-tr-lg rounded-br-lg transition-all",
      "/training":
        "block border-l-4 !border-sky-800 bg-gray-300/10 py-2 pl-3 pr-4 text-base font-medium !text-sky-700 rounded-tr-lg rounded-br-lg transition-all",
      "/register":
        "block border-l-4 !border-green-800 bg-gray-300/10 py-2 pl-3 pr-4 text-base font-medium !text-green-800 rounded-tr-lg rounded-br-lg transition-all",
    };

    const defaultClasses =
      "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium rounded-tr-lg rounded-br-lg text-gray-500 hover:border-gray-300 hover:bg-gray-700/50 hover:text-gray-50 transition-all";

    if (pathname.startsWith(path)) {
      return activeClasses[path] ?? defaultClasses;
    }

    return defaultClasses;
  };

  return (
    <Disclosure
      as="nav"
      // style={{ backgroundImage: "url('structures.png')" }}
      className="shadow bg-black px-4 lg:px-10 text-white"
    >
      <div className="mx-auto relative w-full max-w-7xl justify-between sm:px-3 lg:px-8 z-0">
        {/* <Image className="absolute inset-0 w-full h-full object-cover select-none z-[-1] pointer-events-none brightness-150" alt="blurred flagway structures" priority src={Structures} /> */}
        <div className="flex z-10 h-20 justify-between">
          <div className="flex w-full gap-8 justify-between items-center">
            <FlagwayLogo />
            <div className="hidden sm:pl-12  sm:flex sm:space-x-3 sm:*:min-h-8 *:w-fit">
              <Link
                href="/teams"
                className={clsx(
                  "nav-item relative hover:text-yellow-600" +
                    (pathname.startsWith("/teams") ? " text-yellow-600" : ""),
                )}
              >
                <UserGroupIcon className="inline h-4 mr-2" /> Teams
                {pathname.startsWith("/teams") && (
                  <>
                    <motion.div
                      layoutId="underline"
                      className="bg-yellow-600 w-10/12 h-0.5 absolute -bottom-0.5 left-0 right-0 m-auto"
                    ></motion.div>
                    <span className="sr-only">(current)</span>
                  </>
                )}
              </Link>
              <Link
                href="/posts"
                className={clsx(
                  "nav-item relative hover:text-red-700",
                  pathname.startsWith("/posts") ? " text-red-700" : "",
                )}
              >
                <TrophyIcon className="inline h-4 mr-2" /> Announcements
                {pathname.startsWith("/posts") && (
                  <>
                    <motion.div
                      layoutId="underline"
                      className="bg-red-700 w-10/12 h-0.5 absolute -bottom-0.5 left-0 right-0 m-auto"
                    ></motion.div>
                    <span className="sr-only">(current)</span>
                  </>
                )}
              </Link>
              <Link
                href="/tournaments"
                className={clsx(
                  "nav-item relative hover:text-sky-700" +
                    (pathname.startsWith("/tournaments") ? " text-sky-700" : ""),
                )}
              >
                <TrophyIcon className="inline h-4 mr-2" /> Tournaments
                {pathname.startsWith("/tournaments") && (
                  <>
                    <motion.div
                      layoutId="underline"
                      className="bg-sky-700 w-10/12 h-0.5 absolute -bottom-0.5 left-0 right-0 m-auto"
                    ></motion.div>
                    <span className="sr-only">(current)</span>
                  </>
                )}
              </Link>
              <Link
                href="/register"
                className={clsx(
                  "nav-item relative hover:text-green-800" +
                    (pathname.startsWith("/register") ? " text-green-800" : ""),
                )}
              >
                <FaUserPlus className="inline h-4 mr-2" />
                Register
                {pathname.startsWith("/register") && (
                  <>
                    <motion.div
                      layoutId="underline"
                      className="bg-green-800 w-10/12 h-0.5 absolute -bottom-0.5 left-0 right-0 m-auto"
                    ></motion.div>
                    <span className="sr-only">(current)</span>
                  </>
                )}
              </Link>
              {/* <a href="/near-me" className="nav-item">Flagway Near You</a> */}
              {/* <a href="/login" className="nav-item">Log In</a> */}
              <DashboardNavLink />
            </div>
          </div>
          {/* <div className="hidden sm:ml-6 sm:flex sm:items-center"> */}
          {/* Profile dropdown */}
          {/* <Menu as="div" className="relative ml-3">
							<div>
								<MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<span className="absolute -inset-1.5" />
									<span className="sr-only">Open user menu</span>
									<Image
										alt=""
										src=""
										width={32}
										height={32}
										className="h-8 w-8 rounded-full"
									/>
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
							>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
										Your Profile
									</a>
								</MenuItem>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</Menu> */}
          {/* </div> */}
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            href="/teams"
            className={getMobileClasses("/teams")}
          >
            <UserGroupIcon className="inline h-[1rem] mr-2" /> Teams
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/posts"
            className={getMobileClasses("/posts")}
          >
            <TrophyIcon className="inline h-[1rem] mr-2" /> Announcements
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/tournaments"
            className={getMobileClasses("/tournaments")}
          >
            <TrophyIcon className="inline h-[1rem] mr-2" /> Tournaments
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/register"
            className={getMobileClasses("/register")}
          >
            <FaUserPlus className="inline h-[1rem] mr-2" />
            Register
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
