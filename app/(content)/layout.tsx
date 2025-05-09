import LoadingHOC from "@/components/LoadingHOC";
import Navigation from "@/components/MainNav";
import Loading from "../loading";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="min-h-screen flex-grow">
        <Suspense fallback={<Loading />}>
          <LoadingHOC>{children}</LoadingHOC>
        </Suspense>
      </main>
    </div>
  );
}
