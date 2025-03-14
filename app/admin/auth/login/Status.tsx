"use client";
import { useSearchParams } from "next/navigation";

export default function LoginStatus() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error === "invalid_credentials") {
    return (
      <div className="text-red-700">
        <p>Invalid credentials. Please try again.</p>
      </div>
    );
  }
  return null;
}
