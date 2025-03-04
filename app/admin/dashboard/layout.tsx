import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/components/AuthContext";
import AdminNav from "@/components/AdminNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/admin/auth/login");
  }

  // The user is authenticated, so we can proceed with rendering the layout
  // Every page that uses this layout will have access to the user object
  // through useAuth

  return (
    <AuthProvider user={data.user}>
      <div className="min-h-screen flex flex-col">
        <AdminNav />
        <main className="flex-grow bg-gray-50">{children}</main>
      </div>
    </AuthProvider>
  );
}
