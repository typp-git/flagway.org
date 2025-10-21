import Container from  "@/components/container";
import Link from "next/link";
import { HandRaisedIcon, PencilIcon, EyeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const ResourcesPage = () => {
  const resources = [
    {
      name: "Attendance Template",
      description: "The standard template for taking at Flagway Sites.",
      icon: HandRaisedIcon,
      bgc: "red",
      link: "https://docs.google.com/spreadsheets/d/17VmLSmsM02X1ILeoLYmzdZTPml8sn0wE73ixwYQsEeQ/edit?usp=sharing",
    },
    {
      name: "SAYO Survey for MLWs",
      description: "The SAYO Survey for MLWs working at Flagway Sites.",
      icon: PencilIcon,
      bgc: "yellow",
      link: "https://forms.gle/NyYAHqLbhxnbGPpN6",
    },
    {
      name: "SAYO Survey for Participants",
      description: "The Sayo Survey for students particating at Flagway Sites.",
      icon: PencilIcon,
      bgc: "blue",
      link: "https://forms.gle/QqF4miqKR5gaiFsL7",
    },
    {
      name: "Quarterly Reports",
      description: "The form for submitting Quarterly Reports about your Flagway Site.",
      icon: PencilIcon,
      bgc: "red",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfmBf9tlw6TAxIFVyL0zKUp9j_KBQ1ijE1yzGnDHK82U7lsyw/viewform",
    },
    {
      name: "Flagway Season",
      description: "Information about the current Flagway Season.",
      icon: EyeIcon,
      bgc: "yellow",
      link: "https://www.yppmath.org/",
    },
    {
      name: "Tournament Guide",
      description: "The Official Guide for the Flagway Tournament",
      icon: AcademicCapIcon,
      bgc: "blue",
      link: "https://www.canva.com/design/DAF_ZndNg6U/2EFxRDedyudvPgry9OJQjw/edit",
    }
  ];

  return (
    <div className="">
      <Container>
        <h1 className="text-4xl font-bold mb-8">Resources</h1>
        <h2 className="text-4xl font-bold mb-8">Common Resources useful to Flagway Staff and Sites Alike.</h2>
        <div className="grid gap-6 md:grid-cols-1">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link
                href={resource.link}
                className={`block p-6 bg-${resource.bgc}-50 rounded-lg hover:bg-${resource.bgc}-100 transition-all duration-300 group"`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative p-2 rounded-lg bg-gradient-to-br group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <Icon className="h-8 w-8 text-gray-800 group-hover:text-black transition-colors relative z-10" />
                  </div>
                  <h2 className="text-2xl font-semibold">{resource.name}</h2>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{resource.description}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ResourcesPage;
