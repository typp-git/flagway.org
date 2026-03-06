import Container from "@/components/container";
import Link from "next/link";
import "../../graph.css";
import { MapPinIcon, TrophyIcon, ArrowDownTrayIcon, BookOpenIcon } from "@heroicons/react/24/outline";
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
    {
      name: "National Tournament",
      description: "Information about the annual national tournament",
      path: "/tournaments/national",
      icon: TrophyIcon,
      gradientClasses: "from-sky-500 via-sky-600 to-sky-700",
    },
  ];

  const canvaResources = [
    {
      title: "Tournament Packet",
      subtitle: "2026 National Flagway Tournament Player Guide",
      embedUrl: "https://www.canva.com/design/DAG2WplLflM/7LL9dB3jhcnshRMvy7fgHg/view?embed",
      downloadUrl: "https://www.canva.com/design/DAG2WplLflM/7LL9dB3jhcnshRMvy7fgHg/view",
      aspectRatio: "56.25%", // 16:9 ratio
    },
    {
      title: "Audience Guide",
      subtitle: "2026 National Tournament Guide for Audience",
      embedUrl: "https://www.canva.com/design/DAG2vYLGWn8/H31_7qYki9fhHQHDpm8FKQ/view?embed",
      downloadUrl: "https://www.canva.com/design/DAG2vYLGWn8/H31_7qYki9fhHQHDpm8FKQ/view",
      aspectRatio: "77.2727%", // Custom document ratio
    },
  ];

  return (
    <div className="pb-24">
      {/* Navigation Section */}
      <Container>
        <h1 className="text-4xl font-bold mb-8">Past Tournaments</h1>
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
      </Container>

      {/* Resources Section */}
      <Container className="mt-20">
        <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-6">
          <BookOpenIcon className="h-10 w-10 text-sky-600" />
          <h1 className="text-4xl font-bold text-gray-900">2026 Flagway Season Resources</h1>
        </div>
        
        <div className="flex flex-col gap-12">
          {canvaResources.map((resource, index) => (
            <div 
              key={index} 
              className="w-full bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Canva Embed Area (Top) */}
              <div 
                className="relative w-full bg-gray-50" 
                style={{ paddingTop: resource.aspectRatio }}
              >
                <iframe
                  src={resource.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="fullscreen"
                  loading="lazy"
                ></iframe>
              </div>

              {/* Card Footer with Title and Download (Bottom) */}
              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-500 text-lg">{resource.subtitle}</p>
                </div>
                <div className="shrink-0">
                  <a
                    href={resource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 py-4 px-10 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black hover:scale-[1.02] transition-all shadow-xl shadow-gray-200"
                  >
                    <ArrowDownTrayIcon className="h-6 w-6" />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TournamentPage;