import regions from "@/data/teams";
import Container from "@/components/container";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

// Utility to flatten all teams from regions/states
function getAllTeams() {
  return regions.flatMap(region =>
    region.states.flatMap(state =>
      state.teams
    )
  );
}

export async function generateStaticParams() {
  return getAllTeams().map(team => ({ slug: team.slug }));
}

export default async function Page({ params }: { params: { team: string } }) {
  const team = getAllTeams().find(team => team.slug === params.team);

  if (!team) {
    return <div>Team not found</div>;
  }

  const { name, state, region, players } = team;

  return (
    <Container>
      <Link
        href="/teams"
        className="inline-flex justify-center items-center text-gray-500"
      >
        <ChevronLeftIcon className="h-6 w-6 inline" />
        Back to all teams
      </Link>
      <h1>{name}</h1>
      <div>
        Region: {region}
        <br />
        State: {state}
      </div>
      <h2>Players:</h2>
      {players && players.length > 0 ? (
        players.map((player: { id: string; first_name: string; last_name: string; grade: number }) => (
          <div key={player.id}>
            <div>Name: {player.first_name} {player.last_name}</div>
            <div>Grade: {player.grade}</div>
            {/* <div>City: {player.city}</div> */}
            {/* <div>Years at YPP: {player.yearsYPP}</div> */}
          </div>
        ))
      ) : (
        <div>No players found.</div>
      )}
    </Container>
  );
}