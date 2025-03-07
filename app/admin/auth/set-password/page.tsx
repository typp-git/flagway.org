"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
// import { type EmailOtpType } from "@supabase/supabase-js";
import Link from "next/link";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { FaUnlink } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";
import Loading from "@/app/loading";

export default function AcceptInvite() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | undefined>("no email found");

  useEffect(() => {
    const checkAccess = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.log("Error fetching session:", error);
        router.replace("/admin/auth/login");
        return;
      }

      // const isAuthenticated = data.session !== null;
      const hasValidResetParams =
        tokenHash && (type === "recovery" || type === "invite");

      if (!hasValidResetParams) {
        router.replace("/admin/auth/login");
        return;
      }

      setIsValid(true);
      const { data } = await supabase.auth.getUser();
      setUser(data?.user?.email);
    };

    checkAccess();
    setLoading(false);
  }, [tokenHash, type, router, supabase.auth]);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function updatePassword(formData: FormData) {
    if (success) {
      setMessage(
        "You've already changed your password! Please click the button below to log in to the dashboard.",
      );
      setIsOpen(true);
      return;
    }
    setIsOpen(true);
    const newPassword = formData.get("password") as string;
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(`There was an error updating your password: ${error.code}`);
      setSuccess(false);
    } else if (data) {
      setMessage("Password updated successfully!");
      setSuccess(true);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-xl sm:rounded-lg sm:px-12">
          {loading ? (
            <Loading />
          ) : isValid ? (
            <>
              <h3>Set a new password</h3>
              <div className="mt-1">
                Please set a new password for the account associated with {user}
                .{" "}
              </div>
              <form>
                <div className="mt-6">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="new password"
                    required
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
              <div className="flex flex-col gap-4">
                <h2 className="inline-flex gap-2 items-center">
                  <FaUnlink /> Link expired!
                </h2>
                <div>
                  Your password reset link has expired, please try again.
                </div>
                <Link
                  className="bg-green-700 hover:bg-green-600 hover:cursor-pointer text-white py-1.5 px-3 rounded-xl transition font-bold w-fit"
                  href="/admin/auth/reset"
                >
                  Reset password
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 shadow bg-white rounded-xl p-8">
            <DialogTitle className="flex justify-left gap-2 items-center font-bold">
              <MdLockReset />
              Change Password
            </DialogTitle>
            <Description>{message}</Description>
            <div className="flex gap-4">
              {success ? (
                <button
                  className="bg-green-700 hover:bg-green-600 hover:cursor-pointer text-white py-1.5 px-3 rounded-xl transition"
                  onClick={async () => {
                    setIsOpen(false);
                    router.push("/admin/auth/login");
                  }}
                >
                  Go to dashboard
                </button>
              ) : (
                <button
                  className="bg-red-800 hover:bg-red-700 hover:cursor-pointer text-white py-1.5 px-3 rounded-xl transition"
                  onClick={async () => {
                    setIsOpen(false);
                    router.push("/admin/auth/reset");
                  }}
                >
                  Try again
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
