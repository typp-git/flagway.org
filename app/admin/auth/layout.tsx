import AdminLogo from "@/components/AdminLogo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-20 flex items-center justify-center bg-black text-white">
        <AdminLogo />
      </div>
      <main className="flex-grow bg-gray-50">{children}</main>
    </div>
  );
}
