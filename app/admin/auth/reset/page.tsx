"use client";
import { useState } from "react";
import Head from "next/head";
import { createClient } from "@/utils/supabase/client";
import { MdLockReset } from "react-icons/md";

export default function ResetPassword() {
  const supabase = createClient();
  const [sent, setSent] = useState<null | "sent" | "error">(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  async function resetPassword(formData: FormData) {
    const email = formData.get("email") as string;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/auth/set-password`,
    });
    if (error) {
      setSent("error");
      setErrorMessage(error.message);
    } else {
      setSent("sent");
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-xl sm:rounded-lg sm:px-12">
            <h2 className="inline-flex items-center gap-2">
              <MdLockReset /> Reset password
            </h2>
            <div className="mt-2">
              Enter the email associated with your account and we&apos;ll send
              you an email with instructions to reset your password.
            </div>
            <form className="mt-6">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-700 sm:text-sm/6"
              />
              <button
                className="px-6 mt-3 justify-center rounded-md bg-green-700 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 hover:cursor-pointer"
                type="submit"
                formAction={resetPassword}
              >
                Submit
              </button>
            </form>
            {sent === "sent" ? (
              <div className="mt-2 text-sm/6">
                If an account with that email exists, we&apos;ve sent you an
                email with instructions to reset your password!
              </div>
            ) : sent === "error" ? (
              <div className="mt-2 text-sm/6 text-red-800">
                An error occurred: &quot;{errorMessage}&quot;. Please try again.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
