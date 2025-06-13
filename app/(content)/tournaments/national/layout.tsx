import Container from "@/components/container";
import Link from "next/link";

export default function NationalTournamentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/tournaments" className="hover:text-gray-700">
              National Tournaments
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">
            <Link href="/tournaments/local">
            National
            </Link></li>
        </ol>
      </nav>
      {children}
    </Container>
  );
} 