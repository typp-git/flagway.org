"use client";
import Container from "@/components/container";
import Hero from "@/components/Hero";
// import SideImage from "@/components/SideImage";
// import Breaker from "@/public/photos/breaker.jpg"
// import Loading from "./loading";
// import Structure from "@/public/single-struct.png"
import React from "react";
import "./home.css";
import "../graph.css";
import Image from "next/image";

const imgClasses = "rounded-lg shadow-xl";
const sectionClasses = `mb-12 md:mb-8 md:justify-between justify-center md:gap-24 gap-8 items-center flex flex-col md:flex-row w-full md:w-full  !transition !transition-500 rounded-xl  p-2`;

// export const metadata: Metadata = {
//   title: "Flagway League",
//   description:
//     "Flagway exists to create environments where students can practice and celebrate learning math.",
// };
//
export default function Home() {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="bg-white">
      <main>
        <Hero timelineRef={timelineRef} />
        <div className="w-full h-full graph-paper-flat -mt-[130px]">
          <div className="w-full h-[150px] bg-gradient-to-b from-white to-transparent"></div>
          <Container id="timeline" className="">
            <h2 className="font-bold mx-auto text-center text-5xl mb-5">
              Flagway Season Schedule
            </h2>
            <div
              ref={timelineRef}
              className="relative wrap overflow-hidden p-10 m-auto w-full max-w-xl md:max-w-5xl h-full"
            >
              <div className="hidden md:block absolute bg-blue-700/20 w-1 h-full left-0 right-0 mx-auto"></div>

              <div className={`${sectionClasses} mt-12`}>
                <div className="rounded-full hidden md:block w-5 h-5 bg-[#D1DBF7] absolute left-0 right-0 m-auto"></div>
                <div className="order-1 px-1 py-4 text-left md:w-5/12">
                  <h2 className="font-bold text-2xl">
                    Recruitment and Training
                  </h2>
                  <div className="text-lg italic mb-3">
                    September to December
                  </div>
                  <ul className="text-lg list-disc list-outside ml-5 leading-snug text-gray-900 text-opacity-100">
                    <li>Recruitment kicks off as the Flagway season begins!</li>
                    <li>
                      Students join the Young People&apos;s Project (YPP) and dive
                      into learning the core concepts of Flagway.
                    </li>
                  </ul>
                  <button className="bg-green-700 hover:bg-green-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
                    Request Training
                  </button>
                </div>
                <div className="order-2 px-5 py-3 text-left md:w-5/12">
                  <Image
                    className={"rotate-3 " + imgClasses}
                    src="/photos/grading.jpg"
                    alt="people sitting at table with computer"
                  />
                </div>
              </div>

              <div className={`${sectionClasses} `}>
                <div className="rounded-full hidden md:block w-5 h-5 bg-[#D1DBF7] absolute left-0 right-0 m-auto"></div>
                <div className="order-2 md:order-1 px-3 py-3  md:w-5/12 text-left">
                  <Image
                    className={"-rotate-3 " + imgClasses}
                    src="/photos/table.jpg"
                    alt="people sitting at table with computer"
                  />
                </div>
                <div className="order-1 md:order-2 px-1 py-4 text-left md:w-5/12">
                  <h2 className="font-bold text-2xl">Flagway Practice</h2>
                  <div className="text-lg italic mb-3">January to March</div>
                  <ul className="text-lg list-disc list-outside ml-5 leading-snug text-gray-900 text-opacity-100">
                    <li>
                      Students continue to practice Flagway, focusing on
                      preparing for competition.
                    </li>
                  </ul>
                  <button className="bg-sky-600 hover:bg-sky-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
                    Get training materials
                  </button>
                </div>
              </div>

              <div className={`${sectionClasses}`}>
                <div className="rounded-full hidden md:block w-5 h-5 bg-[#D1DBF7] absolute left-0 right-0 m-auto"></div>
                <div className="order-5 px-1 py-4 md:w-5/12">
                  <h2 className="font-bold text-2xl">
                    Local &amp; Regional Tournaments
                  </h2>
                  <div className="text-lg italic mb-3">April</div>
                  <ul className="text-lg list-disc list-outside ml-5 leading-snug text-gray-900 text-opacity-100">
                    <li>
                      Teams compete locally and regionally to secure their spot
                      to compete on the national stage in May!
                    </li>
                  </ul>
                  <button className="bg-yellow-500 hover:bg-yellow-700 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
                    Regional tournament details
                  </button>
                </div>{" "}
                <div className="order-6 px-3 py-3 text-left md:w-5/12">
                  <Image
                    className={"rotate-3 " + imgClasses}
                    src="/photos/breaker.jpg"
                    alt="people sitting at table with computer"
                  />
                </div>
              </div>

              <div className={`${sectionClasses}`}>
                <div className="rounded-full hidden md:block w-5 h-5 bg-[#D1DBF7] absolute left-0 right-0 m-auto"></div>
                <div className="order-2 md:order-1 px-3 py-3 text-left md:md:w-5/12">
                  <Image
                    className={"-rotate-3 " + imgClasses}
                    src="/photos/winning-squad.jpg"
                    alt="people sitting at table with computer"
                  />
                </div>
                <div className="order-1 md:order-2 px-1 py-4 text-left md:w-5/12">
                  <h2 className="font-bold text-2xl">National Tournament</h2>
                  <div className="text-lg italic mb-3">May</div>
                  <ul className="text-lg list-disc list-outside ml-5 leading-snug text-gray-900 text-opacity-100">
                    <li>
                      Winners of regional tournaments compete at the national
                      tournament!
                    </li>
                  </ul>
                  <button className="bg-rose-600 hover:bg-rose-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
                    National tournament details
                  </button>
                </div>
              </div>
            </div>
          </Container>
          <div className="w-full h-[150px] bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </main>
    </div>
  );
}
