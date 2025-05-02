import Container from "@/components/container";
import Link from "next/link";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function LocalTournamentsPage() {
  const tournaments = [
    {
      name: "Cambridge Tournament 2025",
      path: "/tournaments/local/cmb-2025",
      date: "May 2, 2025",
      location: "Cambridge, MA",
      gradientClasses: "from-yellow-500 via-yellow-600 to-yellow-700",
    },
    // Add more tournaments here as they are created
  ];

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Local Tournaments</h1>
      <div className="grid gap-6">
        {tournaments.map((tournament) => (
          <Link
            key={tournament.path}
            href={tournament.path}
            className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative p-2 rounded-lg bg-gradient-to-br group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${tournament.gradientClasses} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <CalendarIcon className="h-8 w-8 text-gray-800 group-hover:text-black transition-colors relative z-10" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-semibold mb-2">{tournament.name}</h3>
                <div className="text-gray-600 flex gap-3">
                  <span>{tournament.date}</span>
                  <span>{tournament.location}</span>
                  </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
} 