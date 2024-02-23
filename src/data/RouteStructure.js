export const portalPaths = [
  {
    name: "VidhanMandal",
    path: "/ViewAllMandal",
    child: [
      "/ViewAllMandal",
      "/AddVidhanMandal",
      "/EditVidhanMandal",
      "/ViewVidhanMandal",
    ],
  },
  {
    name: "VidhanParishad",
    path: "/ViewAllLegislativeCouncil",
    child: [
      "/ViewAllLegislativeCouncil",
      "/AddLegislativeCouncil",
      "/EditLegislativeCouncil",
      "/ViewLegislativeCouncil",
    ],
  },
  {
    name: "VidhanSabha",
    path: "/ViewAllLegislativeAssembly",
    child: [
      "/ViewAllLegislativeAssembly",
      "/AddLegislativeAssembly",
      "/EditLegislativeAssembly",
      "/ViewLegislativeAssembly",
    ],
  },
  {
    name: "Legislative Member",
    path: "/ViewAllLegislativeMembers",
    child: [
      "/ViewAllLegislativeMembers",
      "/AddLegislativeMembers",
      "/EditLegislativeMember",
      "/ViewLegislativeMember",
      "/Viewmemberprofile",
    ],
  },
  {
    name: "Library",
    path: "/ViewAllLibrary",
    child: ["/ViewAllLibrary", "/AddLibrary", "/EditLibrary", "/ViewLibrary"],
  },
  {
    name: "Biological Information",
    path: "/ViewAllBiologicalInformation",
    child: [
      "/ViewAllBiologicalInformation",
      "/AddBiologicalInformation",
      "/EditBiologicalInformation",
      "/ViewBiologicalInformation",
    ],
  },
  {
    name: "Session Calendar",
    path: "/ViewAllCalendar",
    child: [
      "/ViewAllCalendar",
      "/AddSessionCalendar",
      "/EditSessionCalendar",
      "/ViewCalendar",
    ],
  },
  {
    name: "Rajyapal",
    path: "/ViewAllRajyapal",
    child: [
      "/ViewAllRajyapal",
      "/AddRajyapal",
      "/EditRajyapal",
      "/ViewRajyapal",
    ],
  },
  {
    name: "Faq's",
    path: "/ViewAllFaqs",
    child: ["/ViewAllFaqs", "/AddFaqs", "/EditFaqs", "/ViewFaqs"],
  },
  {
    name: "Gallery",
    path: "/ViewGallery",
    child: ["/ViewGallery", "/AddGallery", "/EditGallery", "/ViewGallery"],
  },
  {
    name: "InterestRequest",
    path: "/ViewInterestRequest",
    child: [
      "/EditInterest",
      "/EditRequest",
      "/ViewInterest",
      "/ViewRequest",
      "/ViewInterestRequest",
    ],
  },
  {
    name: "MantriMandal",
    path: "/ViewAllMantriMandal",
    child: [
      "/AddMantriMandal",
      "/ViewMantriMandal",
      "/EditMantriMandal",
      "/ViewAllMantriMandal",
    ],
  },
];

export const masterPaths = [
  {
    name: "Assembly",
    path: "/ViewAssembly",
    child: ["/ViewAssembly", "/AddAssembly", "/EditAssembly"],
  },
  {
    name: "Political Parties",
    path: "/ViewPoliticalParties",
    child: [
      "/ViewPoliticalParties",
      "/AddPoliticalParties",
      "/EditPoliticalParties",
    ],
  },
  {
    name: "Constituency",
    path: "/ViewConstituency",
    child: ["/ViewConstituency", "/AddConstituency", "/EditConstituency"],
  },
  {
    name: "District",
    path: "/ViewDistrict",
    child: ["/ViewDistrict", "/AddDistrict", "/EditDistrict"],
  },
  {
    name: "User Gender",
    path: "/ViewGender",
    child: ["/ViewGender", "/AddGender", "/EditGender"],
  },
  {
    name: "Ministry",
    path: "/ViewMinistry",
    child: ["/ViewMinistry", "/AddMinistry", "/EditMinistry"],
  },
  {
    name: "Navigation",
    path: "/ViewNavigation",
    child: ["/ViewNavigation", "/AddNavigation", "/EditNavigation"],
  },
];

export const auth = [
  "Admin",
  "SuperAdmin",
  "Reviewer",
  "ContentCreator",
  "User",
];

export const routes = [
  "Login",
  "Dashboard",

  "Assembly",
  "Political Parties",
  "Constituency",
  "District",
  "Gender",
  "Navigation",
  "Ministry",

  "VidhanMandal",
  "VidhanParishad",
  "VidhanSabha",
  "Session Calendar",
  "Portal User",
  "Library",
  "Legislative Member",
  "Biological Information",
  "Rajyapal",
  "Faqs",
  "Gallery",
  "MantriMandal",

  "InterestRequest",
  "Feedback",
  "Helpdesk",
  "User Management",
  "Task Management",
  "Pending",
];
