import regions, { Player } from "@/data/teams";
import Container from "@/components/container";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export async function generateStaticParams() {
  return regions.flatMap((region) =>
    region.data.teams.map((team) => ({ slug: team.slug })),
  );
}

export default async function Page({ params }: { params: { team: string } }) {
  const team = regions
    .flatMap((region) => region.data.teams)
    .find((team) => team.slug === params.team);

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
        Region: {region}.<br />
        State: {state}
      </div>
      <h2>Players:</h2>
      {players && players.length > 0 ? (
        players.map((player: Player) => (
          <div key={player.name}>
            <div>Name: {player.name}</div>
            <div>Grade: {player.grade}</div>
            <div>City: {player.city}</div>
            <div>Years at YPP: {player.yearsYPP}</div>
          </div>
        ))
      ) : (
        <div>No players found.</div>
      )}
    </Container>
  );
}
