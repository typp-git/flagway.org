import React from "react";
import Link from "next/link";
import { login } from "./actions";
import LoginStatus from "./Status";
// import ClearStructure from "@/public/clear-structure.png";
// import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-xl sm:rounded-lg sm:px-12">
          {/* <Image */}
          {/*   src={ClearStructure} */}
          {/*   width={80} */}
          {/*   height={80} */}
          {/*   alt="flagway structure" */}
          {/*   className="m-auto" */}
          {/* /> */}
          {/* <br /> */}
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="text-sm/6">
              <Link
                href="/admin/auth/reset"
                className="font-semibold text-green-700 hover:text-green-600 hover:cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 hover:cursor-pointer"
                formAction={login}
              >
                Sign in
              </button>
            </div>
          </form>
          <LoginStatus />
          {/* <div> */}
          {/*   <div className="relative mt-10"> */}
          {/*     <div */}
          {/*       aria-hidden="true" */}
          {/*       className="absolute inset-0 flex items-center" */}
          {/*     > */}
          {/*       <div className="w-full border-t border-gray-200" /> */}
          {/*     </div> */}
          {/*     <div className="relative flex justify-center text-sm/6 font-medium"> */}
          {/*       <span className="bg-white px-6 text-gray-900"> */}
          {/*         Or continue with */}
          {/*       </span> */}
          {/*     </div> */}
          {/*   </div> */}
          {/**/}
          {/*   <div className="mt-6 flex align-center justify-center *:w-fit  gap-4"> */}
          {/*     <a */}
          {/*       href="#" */}
          {/*       className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent px-6" */}
          {/*     > */}
          {/*       <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5"> */}
          {/*         <path */}
          {/*           d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" */}
          {/*           fill="#EA4335" */}
          {/*         /> */}
          {/*         <path */}
          {/*           d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" */}
          {/*           fill="#4285F4" */}
          {/*         /> */}
          {/*         <path */}
          {/*           d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" */}
          {/*           fill="#FBBC05" */}
          {/*         /> */}
          {/*         <path */}
          {/*           d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" */}
          {/*           fill="#34A853" */}
          {/*         /> */}
          {/*       </svg> */}
          {/*       <span className="text-sm/6 font-semibold">Google</span> */}
          {/*     </a> */}
          {/**/}
          {/**/}
          {/*   </div> */}
          {/* </div> */}
          <br />
          <div className="text-gray-700">
            Note: This is for admin users only! To access Flagway League
            content, please{" "}
            <Link className="text-green-700" href="/">
              click here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
