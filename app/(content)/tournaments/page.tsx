import Container from "@/components/container";
import React from "react";
import "../../graph.css";
import Image from "next/image";
import RegistrationImage from "@/public/photos/grading.jpg";
import Table from "@/public/photos/table.jpg";
import Breaker from "@/public/photos/breaker.jpg";
import WinningSquad from "@/public/photos/winning-squad.jpg";

const TournamentPage: React.FC = () => {
  return (
    <div className="w-full p-5 h-full graph-paper-flat">
      <Container>
        <h1 className="m-auto text-center text-5xl">
          2025 Flagway Season Details
        </h1>
        <p className="text-lg max-w-4xl"></p>
        <br />

        <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12 mx-auto items-center">
          <div className="order-1 relative px-1 py-2 md:w-1/2">
            <h2 className="font-bold">Recruitment and Training</h2>
            <div className="text-lg italic mb-3">
              September to December 2024
            </div>
            <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100">
              <li>Recruitment kicks off as the Flagway season begins!</li>
              <li>
                Students join the Young People’s Project (YPP) and dive into
                learning the core concepts of Flagway.
              </li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-700 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
              Register your group
            </button>

            <div className="absolute hidden md:block bottom-0 h-0.5 w-full bg-gray-200 rounded-xl"></div>
          </div>
          <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]">
            <Image
              className={"rotate-3 rounded-lg"}
              src={RegistrationImage}
              alt="people sitting at table with computer"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12">
          <div className="order-1 relative px-1 py-4 md:w-1/2">
            <h2 className="font-bold text-2xl">Flagway Practice</h2>
            <div className="text-lg italic mb-3">January to March 2025</div>
            <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100">
              <li>
                Students continue to practice Flagway, focusing on preparing for
                competition.
              </li>
            </ul>
            <button className="bg-green-600 hover:bg-green-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
              Get training materials
            </button>
            <div className="absolute hidden md:block bottom-0 h-0.5 w-full bg-gray-200 rounded-xl"></div>
          </div>
          <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]">
            <Image
              className={"-rotate-3 rounded-lg"}
              src={Table}
              alt="people sitting at table with computer"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12">
          <div className="order-1 relative px-1 py-4 md:w-1/2">
            <h2 className="font-bold">Local &amp; Regional Tournaments</h2>
            <div className="text-lg italic mb-3">April 2025</div>
            <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100">
              <li>
                Teams compete locally and regionally to secure their spot to
                compete on the national stage in May!
              </li>
            </ul>
            <button className="bg-sky-600 hover:bg-sky-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
              Regional tournament schedule
            </button>
            <div className="absolute hidden md:block bottom-0 h-0.5 w-full bg-gray-200 rounded-xl"></div>
          </div>
          <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]">
            <Image
              className={"rotate-3 rounded-lg"}
              src={Breaker}
              alt="people sitting at table with computer"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center content-center gap-6 md:gap-12 mb-12">
          <div className="order-1 relative px-1 py-4 md:w-1/2">
            <h2 className="font-bold">National Tournament</h2>
            <div className="text-lg italic mb-3">May 2025</div>
            <ul className="text-lg list-disc list-inside leading-snug text-gray-900 text-opacity-100">
              <li>
                Winners of regional tournament meet in Florida for the national
                tournament!
              </li>
              <li>
                This event brings together teams from across the country to
                showcase their skills, celebrate their growth, and connect with
                a larger community of math learners.
              </li>
            </ul>
            <button className="bg-rose-600 hover:bg-rose-800 mt-5 text-white p-2 rounded-xl font-display font-semibold mb-5">
              National tournament details
            </button>
          </div>
          <div className="order-2 px-5 py-3 w-2/3 md:max-w-[370px]">
            <Image
              className={"-rotate-3 rounded-lg"}
              src={WinningSquad}
              alt="people sitting at table with computer"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TournamentPage;
