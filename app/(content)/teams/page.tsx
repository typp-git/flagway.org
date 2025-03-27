import Container from "@/components/container";
import React from "react";
import regions from "@/data/teams";
import Link from "next/link";
import Image from "next/image";
// LOAD IN TEAM LOGOS FROM BACK END
import Dog from "@/public/team-logos/dog-deep.png";
import Crown from "@/public/team-logos/crown-deep.png";
import Meerkat from "@/public/team-logos/meerkat-deep.png";
import Eagle from "@/public/team-logos/eagle-deep.png";
import Rabbit from "@/public/team-logos/rabbit-deep.png";
import Rhino from "@/public/team-logos/rhino-deep.png";
import Fox from "@/public/team-logos/fox-deep.png";
import Lion from "@/public/team-logos/lion-deep.png";
const RandomLogo = [Dog, Crown, Meerkat, Eagle, Rabbit, Rhino, Fox, Lion];

import { IoIosArrowForward } from "react-icons/io";

const AboutPage: React.FC = () => {
  return (
    <div
      className="h-full flex-1
        bg-[url('/structures.png')]
        bg-gray-950 bg-cover bg-center backdrop-grayscale"
    >
      <Container className="text-white">
        <h1 className="text-3xl font-bold">All Teams</h1>
        <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-400" />

        {/* relative grid min-h-screen grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 bg-gray-50 px-8 py-6 sm:py-12 */}

        <div className="relative grid min-h-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
          {regions.map(({ name, data }) => (
            <div key={name} className="flex flex-col">
              <h3 className="text-2xl font-bold">{name}</h3>
              <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-400" />

              <div className="flex flex-col text-gray-900 h-full">
                {data.teams.map((team) => (
                  <div
                    key={team.name}
                    className="group flex flex-row flex-wrap items-center my-1 mx-1 transition-all bg-gray-700/30 text-white group-hover:text-gray-400 hover:bg-gray-600/50 p-2 rounded-lg shadow-lg transition"
                  >
                    <Link href={`/teams/${team.slug}`} className="w-full">
                      <div className="flex flex-row items-center justify-start">
                        <div className="justify-center shrink-0 h-15 w-15 aspect-square overflow-hidden">
                          <Image
                            src={RandomLogo[team.name.length % 8]}
                            className="object-cover"
                            alt="Team Logo"
                          />
                        </div>
                        <div className="ml-2 flex flex-col relative ">
                          <h3 className="*:bg-clip-text bg-gradient-to-r transition-all">
                            {team.name}
                          </h3>
                          {/* <Link className="text-blue-500 hover:underline" href={`/teams/${team.slug}`}>Group Page</Link> */}
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
      </Container>
    </div>
  );
};

export default AboutPage;
