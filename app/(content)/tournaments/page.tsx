import Container from "@/components/container";
import Link from "next/link";
import "../../graph.css";
import { MapPinIcon, TrophyIcon } from "@heroicons/react/24/outline";
import React from "react";

const TournamentPage = () => {
  const sections = [
    {
      name: "Local Tournaments",
      description: "Find information about local tournaments in your area",
      path: "/tournaments/local",
      icon: MapPinIcon,
      gradientClasses: "from-yellow-500 via-yellow-600 to-yellow-700",
    },
    // {
    //   name: "Regional Tournaments",
    //   description: "Details about regional tournaments and qualifiers",
    //   path: "/tournaments/regional",
    // },
    {
      name: "National Tournament",
      description: "Information about the annual national tournament",
      path: "/tournaments/national",
      icon: TrophyIcon,
      gradientClasses: "from-sky-500 via-sky-600 to-sky-700",
    },
  ];

  return (
    <div className="">
      <Container>
        <h1 className="text-4xl font-bold mb-8">Tournaments</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                href={section.path}
                className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative p-2 rounded-lg bg-gradient-to-br group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${section.gradientClasses} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <Icon className="h-8 w-8 text-gray-800 group-hover:text-black transition-colors relative z-10" />
                  </div>
                  <h2 className="text-2xl font-semibold">{section.name}</h2>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{section.description}</p>
              </Link>
            );
          })}
        </div>
        {/* <UnderConstruction /> */}
        {/* <h1 className="m-auto text-center text-5xl"> */}
        {/*   Flagway Season Details */}
        {/* </h1> */}
        {/* <p className="text-lg max-w-4xl"></p> */}
        {/* <br /> */}
        {/**/}
        {/* <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12 mx-auto items-center"> */}
        {/*   <div className="order-1 relative px-1 py-2 md:w-1/2"> */}
        {/*     <h2 className="font-bold">Recruitment and Training</h2> */}
        {/*     <div className="text-lg italic mb-3"> */}
        {/*       From September to December */}
        {/*     </div> */}
        {/*     <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100"> */}
        {/*       <li>Recruitment kicks off as the Flagway season begins!</li> */}
        {/*       <li> */}
        {/*         Students join the Young People's Project (YPP) and dive into */}
        {/*         learning the core concepts of Flagway. */}
        {/*       </li> */}
        {/*     </ul> */}
        {/*     <button className="bg-yellow-500 hover:bg-yellow-700 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5"> */}
        {/*       Request Training */}
        {/*     </button> */}
        {/**/}
        {/*     <div className="absolute hidden md:block bottom-0 h-0.5 w-full bg-gray-200 rounded-xl"></div> */}
        {/*   </div> */}
        {/*   <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]"> */}
        {/*     <Image */}
        {/*       className={"rotate-3 rounded-lg"} */}
        {/*       src={RegistrationImage} */}
        {/*       alt="people sitting at table with computer" */}
        {/*     /> */}
        {/*   </div> */}
        {/* </div> */}
        {/**/}
        {/* <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12"> */}
        {/*   <div className="order-1 relative px-1 py-4 md:w-1/2"> */}
        {/*     <h2 className="font-bold text-2xl">Flagway Practice</h2> */}
        {/*     <div className="text-lg italic mb-3">From January to March</div> */}
        {/*     <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100"> */}
        {/*       <li> */}
        {/*         Students continue to practice Flagway, focusing on preparing for */}
        {/*         competition. */}
        {/*       </li> */}
        {/*     </ul> */}
        {/*     <button className="bg-green-600 hover:bg-green-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5"> */}
        {/*       Get training materials */}
        {/*     </button> */}
        {/*     <div className="absolute hidden md:block bottom-0 h-0.5 w-full bg-gray-200 rounded-xl"></div> */}
        {/*   </div> */}
        {/*   <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]"> */}
        {/*     <Image */}
        {/*       className={"-rotate-3 rounded-lg"} */}
        {/*       src={Table} */}
        {/*       alt="people sitting at table with computer" */}
        {/*     /> */}
        {/*   </div> */}
        {/* </div> */}
        {/**/}
        {/* <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12"> */}
        {/*   <div className="order-1 relative px-1 py-4 md:w-1/2"> */}
        {/*     <h2 className="font-bold">Local &amp; Regional Tournaments</h2> */}
        {/*     <div className="text-lg italic mb-3">In April</div> */}
        {/*     <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100"> */}
        {/*       <li> */}
        {/*         Teams compete locally and regionally to secure their spot to */}
        {/*         compete on the national stage in May! */}
        {/*       </li> */}
        {/*     </ul> */}
        {/*     <button className="bg-sky-600 hover:bg-sky-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5"> */}
        {/*       Regional tournament schedule */}
        {/*     </button> */}
        {/*     <div className="absolute hidden md:block bottom-0 h-0.5 w-full bg-gray-200 rounded-xl"></div> */}
        {/*   </div> */}
        {/*   <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]"> */}
        {/*     <Image */}
        {/*       className={"rotate-3 rounded-lg"} */}
        {/*       src={Breaker} */}
        {/*       alt="people sitting at table with computer" */}
        {/*     /> */}
        {/*   </div> */}
        {/* </div> */}
        {/**/}
        {/* <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12"> */}
        {/*   <div className="order-1 relative px-1 py-4 md:w-1/2"> */}
        {/*     <h2 className="font-bold">National Tournament</h2> */}
        {/*     <div className="text-lg italic mb-3">In May</div> */}
        {/*     <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100"> */}
        {/*       <li> */}
        {/*         Winners of regional tournament compete at the national */}
        {/*         tournament! */}
        {/*       </li> */}
        {/*       <li> */}
        {/*         This event brings together teams from across the country to */}
        {/*         showcase their skills, celebrate their growth, and connect with */}
        {/*         a larger community of math learners. */}
        {/*       </li> */}
        {/*     </ul> */}
        {/*     <button className="bg-rose-600 hover:bg-rose-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5"> */}
        {/*       National tournament details */}
        {/*     </button> */}
        {/*   </div> */}
        {/*   <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]"> */}
        {/*     <Image */}
        {/*       className={"-rotate-3 rounded-lg"} */}
        {/*       src={WinningSquad} */}
        {/*       alt="people sitting at table with computer" */}
        {/*     /> */}
        {/*   </div> */}
        {/* </div> */}
      </Container>
    </div>
  );
};

export default TournamentPage;
