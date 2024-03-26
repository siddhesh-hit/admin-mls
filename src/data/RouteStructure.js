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
  // {
  //   name: "InterestRequest",
  //   path: "/ViewInterestRequest",
  //   child: [
  //     "/EditInterest",
  //     "/EditRequest",
  //     "/ViewInterest",
  //     "/ViewRequest",
  //     "/ViewInterestRequest",
  //   ],
  // },
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
  {
    name: "Designation",
    path: "/ViewDesignation",
    child: ["/ViewDesignation", "/AddDesignation", "/EditDesignation"],
  },
  {
    name: "Department",
    path: "/ViewDepartment",
    child: ["/ViewDepartment", "/AddDepartment", "/EditDepartment"],
  },
  {
    name: "SessionField",
    path: "/ViewSessionField",
    child: ["/ViewSessionField", "/AddSessionField", "/EditSessionField"],
  },
  {
    name: "Legislative Positions",
    path: "/ViewLegislativePositions",
    child: [
      "/ViewLegislativePositions",
      "/AddLegislativePositions",
      "/EditLegislativePositions",
    ],
  },
  {
    name: "Presiding Officer",
    path: "/ViewPresidingOfficers",
    child: [
      "/AddPresidingOfficers",
      "/ViewPresidingOfficers",
      "/EditPresidingOfficers",
    ],
  },
];

export const homePaths = [
  {
    name: "InterestRequest",
    path: "/ViewInterestRequest",
    child: [
      "/ViewInterestRequest",
      "/ViewRequest",
      "/ViewInterest",
      "/EditRequest",
      "/EditInterest",
    ],
  },
  {
    name: "Feedback",
    path: "/ViewAllFeedbacks",
    child: ["/ViewAllFeedbacks", "/ViewFeedbacks", "/EditFeedbacks"],
  },
  {
    name: "Helpdesk",
    path: "/ViewAllHelpdesk",
    child: ["/ViewAllHelpdesk", "/ViewHelpdesk", "/EditHelpdesk"],
  },
  {
    name: "User Management",
    path: "/UserRole",
    child: ["/UserRole", "/EditRole"],
  },
  {
    name: "Task Management",
    path: "/ViewTask",
    child: ["/ViewTask", "/AddTask", "/EditTask"],
  },
  {
    name: "Portal User",
    path: "/ViewPortalUsers",
    child: [
      "/ViewPortalUsers",
      "/AddPortalUsers",
      "/EditPortalUsers",
      "/BlockUsers",
      "/UserReset",
    ],
  },
  {
    name: "ContactUs",
    path: "/ViewContact",
    child: ["/ViewContact", "/AddContact", "/EditContact"],
  },
  {
    name: "AuditTrail",
    path: "/ViewAudit",
    child: ["/ViewAudit"],
  },
  {
    name: "Workflow",
    path: "/ViewAllWorkflow",
    child: [
      "/ViewAllWorkflow",
      "/ViewWorkflow",
      "/EditWorkflow",
      "/AddWorkflow",
      "/ViewWorkflowHistory",
      "/ViewWorkflowVidhanMandal",
      "/ViewWorkflowMantriMandal",
      "/ViewWorkflowCalendar",
      "/ViewWorkflowFaqs",
      "/ViewWorkflowGallery",
      "/ViewWorkflowInterestRequest",
      "/ViewWorkflowLegislativeAssembly",
      "/ViewWorkflowLegislativeCouncil",
      "/ViewWorkflowLibrary",
      "/ViewWorkflowRajyapal",
      "/ViewWorkflowMemberProfile",
      "/ViewWorkflowGalleryImage",
    ],
  },
  {
    name: "Archive",
    path: "/ViewArchive",
    child: ["/ViewArchive"],
  },
  {
    name: "SEO",
    path: "/Viewseo",
    child: ["/Viewseo", "/AddSEO", "/EditSEO"],
  },
  {
    name: "File Manager",
    path: "/ViewFileManager",
    child: ["/ViewFileManager", "/AddFileManager", "/EditFileManager"],
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
  "Designation",
  "Department",
  "Legislative Positions",
  "Presiding Officer",
  "SessionField",

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
  "ContactUs",
  "AuditTrail",
  "Workflow",
  "Archive",
  "SEO",
  "File Manager",
];

export const authDesc = [
  "SuperAdmin, he can do everything.",
  "ContentCreator, he can create and edit tasks.",
  "User, can visit and perform basic functionality.",
  "Reviewer, he can approve the tasks.",
  "Admin, has functionality similar to SA but with some exceptions.",
];

export const websiteName = [
  "HomePage",
  "Register",
  "Login",
  "PhoneLogin",
  "VerifyOTP",
  "ResetPassword",
  "ForgetPassword",
  "AboutUs",
  "Debate",
  "Debate",
  "Rajyapal",
  "Rajyapal",
  "Search",
  "ContactUs",
  "Library",
  "HelpDesk",
  "MemberAssembly",
  "MantriParishad",
  "AllLink",
  "Feedback",
  "MemberAssembly",
  "MemberCouncil",
  "MemberCouncil",
  "Gallery",
  "LegislativeAssembly",
  "LegislativeCouncil",
  "Judgment",
  "SessionCalender",
  "Gazetteers",
  "Publication",
  "Gazette",
  "ElectionResult",
  "BudgetYear",
  "LegislationsBill",
];
