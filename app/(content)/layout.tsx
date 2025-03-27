import Navigation from "@/components/MainNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow min-h-screen md:h-screen">{children}</main>
    </div>
  );
}
