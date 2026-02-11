import Container from "@/components/container";
import Link from "next/link";
import {
  HandRaisedIcon,
  PencilIcon,
  BookmarkIcon,
  AcademicCapIcon,
  CalendarIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const ResourcesPage = () => {
  const resources = [
     {
      id: "training-survey",
      name: "Post-Training Survey",
      description: "Survey to be filled out at the conclusion of any YPP training.",
      icon: PencilIcon,
      bgc: "bg-orange-400",
      link: "https://forms.gle/rHtBsUqmfVkePRyU6",
      section: "Report",
    },
    {
      id: "media-release",
      name: "Media Release Form",
      description: "Use this form for consent to be shown in YPP marketing materials.",
      icon: HandRaisedIcon,
      bgc: "bg-blue-400",
      link: "https://eform.pandadoc.com/?eform=08e931c4-c3e9-40a7-8b3e-0f40806ccf67",
      section: "Implement",
    },
    {
      id: "attendance-template",
      name: "Participant Attendance Template",
      description:
        "Use this attendance template to track daily or session-based attendance for all program participants receiving math literacy instruction. This helps YPP staff monitor engagement and involvement.",
      icon: HandRaisedIcon,
      bgc: "bg-blue-400",
      link: "https://docs.google.com/spreadsheets/d/17VmLSmsM02X1ILeoLYmzdZTPml8sn0wE73ixwYQsEeQ/edit?usp=sharing",
      section: "Implement",
    },
    {
      id: "mlw-timesheet-template",
      name: "MLW Timesheets",
      description:
        "Used by Program Coordinators to track Math Literacy Workers (MLWs) hours, training participation, and other work related time. The timesheet ensures accurate payroll processing and supports transparent reporting of youth employment within YPP programs.",
      icon: HandRaisedIcon,
      bgc: "bg-blue-400",
      link: "https://docs.google.com/spreadsheets/d/1a0UfpVmXI_YoaAOEyuUaHHoA8OCZcu3uPA5YAO3r04w/edit?usp=sharing",
      section: "Implement",
    },
    {
      id: "mlw-outreach-template",
      name: "MLW Lesson Plan Template",
      description:
        "Guides Math Literacy Workers in planning high-quality instructional sessions. Helps MLWs outline objectives, materials, roles, and strategies that support YPPs youth-led teaching model and ensure consistent, engaging math experiences.",
      icon: PlayIcon,
      bgc: "bg-blue-400",
      link: "https://docs.google.com/document/d/1CYcxJJJO7DWeqv1OrWCA72FtKpCYg6bGAuMDxmR0H0U/edit?usp=sharing",
      section: "Implement",
    },
    {
      id: "sayo-mlw",
      name: "SAYO Survey for MLWs",
      description: "A reflection and evaluation tool for MLWs to self-assess skill development, leadership growth, and experiences in YPP's programs. Collected data informs program improvement and captures youth perspectives on learning outcomes. ",
      icon: PencilIcon,
      bgc: "bg-orange-400",
      link: "https://forms.gle/NyYAHqLbhxnbGPpN6",
      section: "Report",
    },
    {
      id: "sayo-participant",
      name: "SAYO Survey for Participants",
      description: "Administered to student participants to measure engagement, confidence, and academic or personal growth through YPP activities. This survey provides valuable feedback on the effectiveness and impact of YPP's learning environments.",
      icon: PencilIcon,
      bgc: "bg-orange-400",
      link: "https://forms.gle/QqF4miqKR5gaiFsL7",
      section: "Report",
    },
    {
      id: "quarterly-reports",
      name: "Quarterly Reports",
      description: "Summarizes YPP program activities, outcomes, staffing, and partnerships over a three-month period. The report supports internal reflection, accountability to funders, and continuous program development.",
      icon: PencilIcon,
      bgc: "bg-orange-400",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfmBf9tlw6TAxIFVyL0zKUp9j_KBQ1ijE1yzGnDHK82U7lsyw/viewform",
      section: "Report",
    },
    {
      id: "flagway-season",
      name: "Flagway Season Schedule",
      description: "Outlines the full schedule of the Flagway League season, including training, recruitment, teacher/learning, practice, and tournament milestones. It serves as a reference for teams, coaches, and partners involved in Flagway programming.",
      icon: CalendarIcon,
      bgc: "bg-yellow-400",
      link: "/",
      section: "Plan",
    },
    {
      id: "tournament-packet",
      name: "National Flagway Tournament Packet",
      description: "A comprehensive guide for YPP's National Flagway Tournament. Includes event logistics, team rosters, rules, travel information, and schedules. This packet ensures all participating teams and partners are fully prepared for national competition.",
      icon: BookmarkIcon,
      bgc: "bg-yellow-400",
      link: "https://www.canva.com/design/DAG2WplLflM/So93yQLjWeB_rPFGiFP4IQ/view?utm_content=DAG2WplLflM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha7f1c347d3",
      section: "Plan",
    },
    {
      id: "milestone-report",
      name: "Milestone Report",
      description: "Documents the completion of a specific YPP activity, milestone, training, or short-term project. Summarizes goals, participation, outcomes, lessons learned, and next steps—supporting evaluation, reporting, and institutional learning.",
      icon: AcademicCapIcon,
      bgc: "bg-orange-400",
      link: "https://forms.gle/U7tH8B7ms8j36fTU7",
      section: "Report",
    },
    {
      id: "coordinator-time",
      name: "Teacher Coordinator Timesheet",
      description: "Use this template to keep track of teacher coordinator time by month.",
      icon: HandRaisedIcon,
      bgc: "bg-blue-400",
      link: "https://docs.google.com/spreadsheets/d/12vTn0_mu9cQFdPrNo_oa_n2ODtNEolV83BAqvN316y4/edit?usp=sharing",
      section: "Implement",
    },
    
    
  ];
  const sections = ["Plan", "Resource", "Implement", "Report"];

  return (
    <div className="bg-black">
      <Container>
        <h1 className="text-4xl font-bold mb-4 text-white">Resources</h1>
        <h2 className="mb-10 text-gray-600">
          Use the resources here to keep track of your YPP program activity. 
        </h2>

        <div className="space-y-16">
          {sections.map((section) => {
            const filtered = resources.filter((r) => r.section === section);
            if (filtered.length === 0) return null;

            return (
              <div key={section}>
                <p className="text-3xl font-bold mb-4 text-white">{section}</p>
                <div className="overflow-x-auto flex gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {filtered.map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <div
                        key={resource.id}
                        className={`min-w-[300px] max-w-sm p-6 ${resource.bgc} rounded-lg transition-all duration-300 group`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative bg-black p-2 rounded-lg bg-gradient-to-br group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                            <Icon className="h-8 w-8 text-white rounded-xl transition-colors relative z-10" />
                          </div>
                          <Link
                            href={resource.link}
                            className="text-lg font-extrabold text-black hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resource.name}
                          </Link>
                        </div>
                        <p className="text-sm text-black-600 transition-colors">
                          {resource.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ResourcesPage;
