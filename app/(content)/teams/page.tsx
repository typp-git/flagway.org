import Container from "@/components/container";
import React from "react";
// import regions from "@/data/teams";
// import Link from "next/link";
import UnderConstruction from "@/components/UnderConstruction";

const AboutPage: React.FC = () => {
  return (
    <Container className="">
      {/* <h1 className="text-3xl font-bold">All Teams</h1> */}
      <UnderConstruction />
      {/* <div className="flex flex-col gap-5"> */}
      {/*   {regions.map(({ name, data }) => ( */}
      {/*     <div key={name}> */}
      {/*       <h2 className="text-2xl font-bold">{name}</h2> */}
      {/*       <ul> */}
      {/*         {data.teams.map((team) => ( */}
      {/*           <li key={team.name}> */}
      {/*             <Link href={`/teams/${team.slug}`}>{team.name}</Link> */}
      {/*           </li> */}
      {/*         ))} */}
      {/*       </ul> */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}
    </Container>
  );
};

export default AboutPage;
