"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import AdminLogo from "@/components/AdminLogo";

export default function Result() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(1);
  const [loading, setLoading] = useState(true); // Track loading state
  const supabase = createClient();
  const [user, setUser] = useState<null | User>(null);

  // Refs for timer and interval to ensure proper cleanup
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user);

        // Start countdown and redirect
        timerRef.current = setTimeout(() => {
          router.push("/admin/dashboard");
        }, countdown * 1000);

        intervalRef.current = setInterval(() => {
          setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
        }, 1000);
      } else {
        router.push("/admin/auth/login");
      }
      setLoading(false);
    };

    checkLogin();

    // Cleanup timers on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [supabase, router, countdown]);

  useEffect(() => {
    // Stop countdown at 0
    if (countdown <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [countdown]);
  return (
    <div className="flex flex-col justify-start items-center min-h-[75vh]">
      <div className="w-full h-20 flex items-center justify-center bg-black text-white">
        <AdminLogo />
      </div>{" "}
      <div className="text-center space-y-4 mt-12">
        {loading ? (
          // Loading Screen
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 border-4 border-green-700  border-t-transparent rounded-full animate-spin"></div>
            <p>Checking login status...</p>
          </div>
        ) : user ? (
          <>
            <h1>Success!</h1>
            <p>You have successfully logged in to your Flagway account.</p>
            <p>
              Redirecting to dashboard in {countdown}...{" "}
              <a href="/admin/dashboard" className="text-green-700 underline">
                Go there now.
              </a>
            </p>
          </>
        ) : (
          <>
            <h1>Login Failed</h1>
            <p>We couldn&apos;t log you in. Please try again.</p>
            <a href="/admin/auth/login" className="text-green-700 underline">
              Go to Login Page
            </a>
          </>
        )}
      </div>
    </div>
  );
}
