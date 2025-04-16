"use client";
import { useAuth } from "@/components/AuthContext";
import AdminDash from "@/components/AdminDash";

export default function Dashboard() {
  const { user } = useAuth();
  return <>{user && <AdminDash />}</>;
}
