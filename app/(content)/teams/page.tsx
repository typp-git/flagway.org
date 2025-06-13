import Container from "@/components/container";
import React from "react";
import { Region } from "@/data/teams";
import Link from "next/link";
import Image from "next/image";
import { getDisplayTeams } from "@/utils/supabase/database_functions";
import { IoIosArrowForward } from "react-icons/io";
import LoadingHOC from "@/components/LoadingHOC";

const teamImageRefStem = 'https://qbrwntkvkdhrfolsgtpw.supabase.co/storage/v1/object/public/teams/'
const defaultImage_Ref = 'default/profile-picture.jpg';

export default async function TeamsPage() {
  const regions: Region[] = await getDisplayTeams();
  return (
    <div
      className="h-full flex-1
        bg-[url('/structures.png')]
        bg-gray-950 bg-cover bg-center backdrop-grayscale"
    >
      <LoadingHOC>
        <Container className="text-white">
          <h1 className="text-3xl font-bold">All Teams</h1>
          <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-400" />

          <div className="relative grid min-h-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {regions.map((region) => (
              <div key={region.id} className="flex flex-col">
                <h3 className="text-2xl font-bold">{region.name}</h3>
                <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-400" />
                {region.states.map((state) => state.teams.length === 0?
                ( // no teams in state
                  <div key={state.id} className="m-0"></div>
                ) : (
                  
                  <div key={state.id} className="mb-4">
                    <h4 className="text-lg font-semibold ml-2">{state.name}</h4>
                    <div className="flex flex-col text-gray-900 h-full">
                      
                      {state.teams.map((team) => (
                        <div
                          key={team.id}
                          className="group flex flex-row flex-wrap items-center my-1 mx-1 transition-all bg-gray-700/30 text-white group-hover:text-gray-400 hover:bg-gray-600/50 p-2 rounded-lg shadow-lg transition"
                        >
                          <Link href={`/teams/${team.slug}`} className="w-full">
                            <div className="flex flex-row items-center justify-start">
                              <div className="justify-center shrink-0 h-15 w-15 aspect-square overflow-hidden">
                                <Image
                                  src={team.photo_ref != null && team.photo_ref !== "" ?
                                    `${teamImageRefStem}${team.photo_ref}`:`${teamImageRefStem}${defaultImage_Ref}`}
                                  alt={`${team.name} logo`}
                                  width={60}
                                  height={60}
                                  className="rounded-full"
                                />
                              </div>
                              <div className="ml-2 flex flex-col relative ">
                                <h3 className="*:bg-clip-text bg-gradient-to-r transition-all">
                                  {team.name}
                                </h3>
                                <span className="text-xs text-gray-300">{state.name}, {region.name}</span>
                              </div>
                              <span className="mr-2 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 pr-2  transition-all ">
                                <IoIosArrowForward className="h-6 w-6" />
                              </span>
                            </div>
                          </Link>
                        </div>
                      ))}

                    </div>
                  </div>
                ))}


              </div>
            ))}
          </div>
        </Container>
      </LoadingHOC>
    </div>
  );
};