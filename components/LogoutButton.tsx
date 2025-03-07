"use client";
import { createClient } from "@/utils/supabase/client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";

export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  return (
    <>
      <button
        className="bg-red-950 hover:bg-red-900 text-white font-bold py-1.5 flex gap-1 items-center justify-center px-3 rounded-lg h-fit my-auto !text-base font-normal transition hover:cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <TbLogout />
        Log out
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 shadow bg-white rounded-xl p-8">
            <DialogTitle className="flex justify-left gap-2 items-center font-bold">
              Log out
              <TbLogout />
            </DialogTitle>
            <Description>Are you sure you want to log out?</Description>
            <div className="flex gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-100 hover:cursor-pointer text-gray-950 py-1.5 px-3 rounded-xl transition"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-800 hover:bg-red-700 hover:cursor-pointer text-white py-1.5 px-3 rounded-xl transition"
                onClick={async () => {
                  setIsOpen(false);
                  await supabase.auth.signOut();
                  router.push("/admin/auth/login");
                }}
              >
                Log out
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
