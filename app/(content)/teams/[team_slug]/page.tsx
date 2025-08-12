"use client"

import { Player, Region, DisplayTeam} from "@/data/teams";
import Container from "@/components/container";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingHOC from "@/components/LoadingHOC";
import { defaultTeamImageRef, defaultPlayerImageRef, getPublicImageRef, getDisplayTeams } from "@/utils/supabase/database_functions";

// Utility to flatten all teams from regions/states
// Adds Region and State name to each team object. 
function getAllTeams(regions: Region[]) {
  return regions.flatMap(region =>
    region.states.flatMap(state =>
      state.teams.map(team => ({
        ...team,
        region: region.name,
        state: state.name,
      }))
    )
  );
}

export default function Page({ params }: { params: { team_slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState<Region[]>([]);
  

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      const data = await getDisplayTeams();
      setRegions(data);
      setLoading(false);
    }
    fetchTeams();
  }, []);

  const allTeams: DisplayTeam[] = getAllTeams(regions);
  const team = allTeams.find(team => team.slug == params.team_slug);
  

  if (loading) {
    return (
      <div
      className="min-h-screen flex-grow
        bg-[url('/structures.png')]
        bg-gray-950 bg-cover bg-center backdrop-grayscale"
      >
      <LoadingHOC>  
        <div>Loading...</div>
      </LoadingHOC>
      </div>)
  }

  if (team == undefined || team === null) {
    return <div>Team not found</div>;
  }
  
  const { name, region, state, players } = team;

  return (
    <div
      className="min-h-screen flex-grow
        bg-[url('/structures.png')]
        bg-gray-950 bg-cover bg-center backdrop-grayscale"
    >
      <LoadingHOC>
        <Container className="text-white">
          <Link
            href="/teams"
            className="inline-flex justify-center items-center text-lg mb-3"
          >
            <ChevronLeftIcon className="h-5 inline" />
            Back to All Teams
          </Link>

          <div className="h-30 mb-6 w-full flex flex-row items-center">
            <div
              className="h-full justify-center shrink-0 aspect-square overflow-hidden
            [clip-path:polygon(100%_0,100%_50%,100%_100%,0_100%,0%_50%,0_0)]"
            >
              <Image
                src={team.photo_ref != null && team.photo_ref !== "" ?
                  `${getPublicImageRef("teams", team.photo_ref)}`:`${defaultTeamImageRef}`}
                alt="Team Logo"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <div
              className="ml-4 pl-12 pr-20 h-full flex-grow min-w-80
            flex flex-col items-start justify-center 
            bg-gray-700/30 
            [clip-path:polygon(0_0,95%_0%,100%_50%,95%_100%,0_100%)]"
            >
              <h1 className="bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text">
                {name}
              </h1>
              <div>
                <span className="text-blue-300">Region:</span> {region}
              </div>
              <div>
                <span className="text-blue-300">State:</span> {state}
              </div>
            </div>
          </div>

          <h2 className="italic mb-3">PLAYERS</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {Array.isArray(players) && players.length > 0 ? (
              (players as Player[]).map((player) => (
                <div
                  className="flex flex-col md:flex-row
                max-w-xs md:max-w-xl rounded-lg 
                items-center md:items-start overflow-hidden
                bg-gray-700/30 hover:scale-[1.02] hover:bg-gray-600/50
                md:min-h-[200px] gap-2
                transition-all duration-300 ease-in-out"
                  key={player.id ?? player.first_name + player.last_name}
                >
                  <div className="relative h-full w-2/5 lg:w-2/5 md:h-full object-cover group">
                    <div className="absolute text-transparent group-hover:text-blue-200"></div>
                    <div
                      className="flex h-full w-[0.9] items-center justify-center aspect-square overflow-hidden 
                  md:[clip-path:polygon(0_0,0_100%,65%_100%,90%_0,95%_0,70%_100%,75%_100%,100%_0)]"
                    >
                      <Image
                        src={player.photo_ref != null && player.photo_ref !== "" ?
                          `${getPublicImageRef("players", player.photo_ref)}`:`${defaultPlayerImageRef}`}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start h-full w-4/5 md:h-1/2 py-6 px-6 text-white text-left italic">
                    <h3 className="group uppercase !font-bold text-[1rem]">
                      {player.first_name} {player.last_name}
                    </h3>
                    <div className="w-full">
                      <hr className="border-2 m-2 border-red-500 group text-white" />
                      <hr className="border-2 border-yellow-400 group text-white" />
                      <hr className="border-2 m-2 border-sky-500 group text-white" />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-y-2 gap-x-2 lg:gap-x-7 mt-1">
                      <div>
                        <span className="text-blue-300">Years at YPP:</span>{" "}
                        <span className="text-1xl">{player.years_YPP ?? "—"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Grade:</span>{" "}
                        <span className="text-1xl">{player.grade}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">City:</span>{" "}
                        <span className="text-1xl">{player.city ?? "—"}</span>
                      </div>
                      {/* <div>
                        <span className="text-blue-300">Gender:</span>{" "}
                        <span className="text-1xl">{player.gender}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">T-shirt Size:</span>{" "}
                        <span className="text-1xl">{player.tshirt_size}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Photo Consent:</span>{" "}
                        <span className="text-1xl">{player.photo_consent_given ? "Yes" : "No"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Prev. Tournament Exp:</span>{" "}
                        <span className="text-1xl">{player.previous_tournament_experience ? "Yes" : "No"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Verified:</span>{" "}
                        <span className="text-1xl">{player.verified ? "Yes" : "No"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Email:</span>{" "}
                        <span className="text-1xl">{player.email ?? "—"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Phone:</span>{" "}
                        <span className="text-1xl">{player.phone ?? "—"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Dietary Restrictions:</span>{" "}
                        <span className="text-1xl">{player.dietary_restrictions ?? "—"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Emergency Contact:</span>{" "}
                        <span className="text-1xl">{player.emergency_contact_name ?? "—"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Emergency Phone:</span>{" "}
                        <span className="text-1xl">{player.emergency_contact_phone ?? "—"}</span>
                      </div>
                      <div>
                        <span className="text-blue-300">Emergency Relationship:</span>{" "}
                        <span className="text-1xl">{player.emergency_contact_relationship ?? "—"}</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Players Found.</div>
            )}
          </div>
        </Container>
      </LoadingHOC>
    </div>
  );
}