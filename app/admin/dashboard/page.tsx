"use client";
import { useAuth } from "@/components/AuthContext";
import UnderConstruction from "@/components/UnderConstruction";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      {user && <p className="text-center mt-4">Welcome, {user.email}!</p>}
      <UnderConstruction />
    </>
  );
}
