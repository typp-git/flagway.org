"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { FaGears } from "react-icons/fa6";

export default function DashboardNavLink() {
  const supabase = createClient();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data.user);
      if (data?.user) {
        setLoggedIn(true);
      }
    })();
  });

  if (!loggedIn) return null;

  return (
    <>
      <Link
        href="/admin/dashboard"
        className="bg-green-950 hover:bg-green-900 text-white font-bold py-1.5 flex gap-1 items-center justify-center px-3 rounded-lg h-fit my-auto !text-base transition hover:cursor-pointer"
      >
        <FaGears />
        Admin Dashboard
      </Link>
    </>
  );
}
