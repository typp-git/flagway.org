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

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="absolute -z-100 h-full w-full overflow-hidden
        bg-[url('/court-background-by-caroline-justine.jpg')]
        bg-gray-700 bg-cover bg-blend-overlay bg-center">
      </div>
      <Container className="text-white">
        <h1 className="text-3xl font-bold">All Teams</h1>

        <div className="flex flex-col gap-5">
          {regions.map(({ name, data }) => (
            <div key={name}>
              <h2 className="text-2xl font-bold ">{name}</h2>

                {data.teams.map((team) => (
                  <Link href={`/teams/${team.slug}`} key={team.name}>
                    <div className="flex flex-row flex-wrap items-center h-15 mb-6 w-full">
                      <div className="justify-center h-full  aspect-square overflow-hidden [clip-path:polygon(100_0,100%_50%,100_100%,0_100%,0%_50%,0_0)]">
                        <Image src={RandomLogo[team.name.length % 8]} className="" alt="Team Logo" />
                      </div>
                      <div 
                        className="flex flex-col items-start
                        justify-center px-2 h-full
                        min-w-80 bg-gray-800 text-white
                        bg-[url('/thin_struct.png')]
                        bg-cover bg-center 
                        [clip-path:polygon(100%_0,100%_50%,100%_100%,0_100%,0%_50%,0_0)]
                        "
                      >
                        <h1 className="bg-clip-text bg-gradient-to-r from-white to-blue-200 text-transparent">{team.name}</h1>
                      </div>

                      {/* <div className="justify-center h-full bg-white pl-2 pr-4 overflow-hidden [clip-path:polygon(80%_0,100%_50%,80%_100%,0_100%,20%_50%,0_0)]"> */}
                    </div>
                  </Link>
                ))}
            </div>
          ))}
        </div>


      </Container>
    </div>
  );
};

export default AboutPage;
