import Container from "@/components/container";
import React from "react";
import regions from "@/data/teams";
import Link from "next/link";

const TeamsPage: React.FC = () => {
  return (
    <Container className="">
      <h1 className="text-3xl font-bold">All Teams</h1>
      <div className="flex flex-col gap-5">
        {regions.map((region) => (
          <div key={region.id}>
            <h2 className="text-2xl font-bold">{region.name}</h2>
            {region.states.map((state) => (
              <div key={state.id} className="ml-4">
                <h3 className="text-xl font-semibold">{state.name}</h3>
                <ul>
                  {state.teams.length > 0 ? (
                    state.teams.map((team) => (
                      <li key={team.id}>
                        <Link href={`/teams/${team.slug}`}>{team.name}</Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 italic">No teams</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TeamsPage;