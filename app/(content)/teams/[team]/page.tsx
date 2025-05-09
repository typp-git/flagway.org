import regions, { Player } from "@/data/teams";
import Container from "@/components/container";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import Image from "next/image";
import LoadingHOC from "@/components/LoadingHOC";

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
  // TODO: add grid layout for players
  return (
    <div
      // className="absolute w-full
      // bg-[url('/court-background-by-caroline-justine.jpg')]
      // bg-black/90 bg-cover bg-blend-overlay bg-center"
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
              {/* <div className="h-full justify-center aspect-square overflow-hidden [clip-path:polygon(75%_0,100%_50%,75%_100%,0_100%,25%_50%,0_0)]"> */}
              <Image
                src="/team-logos/dog-deep.png"
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
                {" "}
                <span className="text-blue-300">Region:</span> {region}
              </div>
              <div>
                {" "}
                <span className="text-blue-300">State:</span> {state}
              </div>
            </div>

            {/* <div className="justify-center h-full bg-white pl-2 pr-4 overflow-hidden [clip-path:polygon(80%_0,100%_50%,80%_100%,0_100%,20%_50%,0_0)]"> */}
            {/* </div> */}
          </div>

          <h2 className="italic mb-3">PLAYERS</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {players && players.length > 0 ? (
              players.map((player: Player) => (
                <div
                  className="flex flex-col md:flex-row
                max-w-xs md:max-w-xl rounded-lg 
                items-center md:items-start overflow-hidden
                bg-gray-700/30 hover:scale-[1.02] hover:bg-gray-600/50
                md:min-h-[200px] gap-2
                transition-all duration-300 ease-in-out"
                  key={player.name}
                >
                  <div className="relative h-full w-2/5 lg:w-2/5 md:h-full object-cover group">
                    <div className="absolute text-transparent group-hover:text-blue-200">
                      {/* <FaPencilAlt className="p-4 w-16 h-16 z-50"/> */}
                    </div>

                    <div
                      className="flex h-full w-[0.9] items-center justify-center aspect-square overflow-hidden 
                  md:[clip-path:polygon(0_0,0_100%,65%_100%,90%_0,95%_0,70%_100%,75%_100%,100%_0)]
                  "
                    >
                      <Image
                        src={
                          player.grade % 3 == 1
                            ? "/profile-pic-icons/example_avatar_dog.jpg"
                            : player.grade % 3 == 2
                              ? "/profile-pic-icons/profile-picture-opt-2.png"
                              : "/profile-pic-icons/profile-picture-opt-1.png"
                        }
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start h-full w-4/5 md:h-1/2 py-6 px-6 text-white text-left italic">
                    <h3 className="group uppercase !font-bold text-[1rem]">
                      {player.name}
                    </h3>
                    <div className="w-full">
                      <hr className="border-2 m-2 border-red-500 group text-white" />
                      <hr className="border-2 border-yellow-400 group text-white" />
                      <hr className="border-2 m-2 border-sky-500 group text-white" />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-y-2 gap-x-2 lg:gap-x-7 mt-1">
                      <div>
                        {/* <span className="text-2xl">{player.yearsYPP}</span><span className="text-blue-300"> Year{player.yearsYPP == 1 ? "":"s"} at YPP</span> */}
                        <span className="text-blue-300"> Years at YPP:</span>{" "}
                        <span className="text-1xl">{player.yearsYPP}</span>
                      </div>
                      <div>
                        {/* <span className="text-2xl">{player.grade}</span><span className="text-blue-300">th Grade</span> */}
                        <span className="text-blue-300"> Grade: </span>{" "}
                        <span className="text-1xl">{player.grade}</span>
                      </div>
                      <div>
                        <span className="text-blue-300"> City: </span>{" "}
                        <span className="text-1xl">{player.city}</span>
                      </div>
                    </div>
                  </div>

                  {/*
              <div className="relative group inset-0 py-6 px-4 bg-indigo-600 text-white text-right ">
                <div className="absolute inset-0 py-6 px-4 bg-indigo-600 text-white text-right motion-safe:duration-500 ease-out [clip-path:polygon(100%_0,100%_0,100%_100%,75%_100%)] group-hover:[clip-path:polygon(50%_0,100%_0,100%_100%,25%_100%)]">
                    <div className="py-6 px-12 border-2 border-indigo-600 group text-indigo-600">
                      {player.name}
                    </div>

                    <hr className="py-6 px-12 border-2 border-indigo-600 group text-indigo-600"/>

                </div>
              </div> */}
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

{
  /* <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div> */
}
