"use client";
import { useSearchParams } from "next/navigation";

export default function Error() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <div className="text-center space-y-4">
        <h1>Oops!</h1>
        <p>Something went wrong. Please try again!</p>
        {message && <p>{message}</p>}
        <p>
          <a href="/">go back home</a>
        </p>
      </div>
    </div>
  );
}
