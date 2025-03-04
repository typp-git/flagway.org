"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type EmailOtpType } from "@supabase/supabase-js";
import Link from "next/link";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   DialogTitle,
//   Description,
// } from "@headlessui/react";

export default function AcceptInvite() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/admin";
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token_hash && type) {
      const verifyOtp = async () => {
        const { error } = await supabase.auth.verifyOtp({
          type,
          token_hash,
        });

        if (!error) {
          setValidToken(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };

      verifyOtp();
    } else {
      setLoading(false);
    }
  }, [token_hash, type, next, router, supabase.auth]);

  async function updatePassword(formData: FormData) {
    setIsOpen(true);
    const newPassword = formData.get("password") as string;
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (data) setMessage("Password updated successfully!");
    if (error)
      setMessage(`There was an error updating your password: ${error.code}`);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-xl sm:rounded-lg sm:px-12">
          {loading ? (
            // Loading Screen
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 border-4 border-green-700  border-t-transparent rounded-full animate-spin"></div>
              <p>Checking token...</p>
            </div>
          ) : validToken ? (
            <>
              <h3>Set a new password</h3>
              <div className="mt-1">
                To access your account, please set a new password!
              </div>
              <form>
                <div className="mt-6">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="new password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
                  />
                </div>

                <button
                  className="px-6 mt-3 justify-center rounded-md bg-green-700 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 hover:cursor-pointer"
                  type="submit"
                  formAction={updatePassword}
                >
                  Submit
                </button>
              </form>
            </>
          ) : (
            <>
              <div>
                Your password reset link has expired! Please try again.{" "}
                <Link
                  className="text-green-700 underline"
                  href="/admin/auth/reset"
                >
                  Reset password.
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
