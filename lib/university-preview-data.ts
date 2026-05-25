export type DegreeLevel = "Bachelor" | "Master" | "PhD";
export type TeachingLanguage = "English-taught" | "Chinese-taught";

export type AdmissionsPanel = {
  degree: DegreeLevel;
  language: TeachingLanguage;
  tuition: string;
  duration: string;
  intake: string;
  deadline: string;
  languageRequirement: string;
  academicRequirement: string;
  requiredDocuments: string[];
  scholarship: string;
  note: string;
};

export type UniversityPreview = {
  slug: string;
  englishName: string;
  chineseName: string;
  mottoZh?: string | null;
  mottoEn?: string | null;
  city: string;
  region: string;
  establishedYear: number;
  website: string;
  tuitionRange: string;
  heroSummary: string;
  overview: string;
  cityPitch: string;
  campusHighlights: string[];
  tags: string[];
  rankings: {
    system: string;
    year: number;
    rank: string;
    label: string;
  }[];
  quickFacts: {
    label: string;
    value: string;
  }[];
  admissions: AdmissionsPanel[];
  scholarships: {
    title: string;
    description: string;
  }[];
  studentLife: {
    title: string;
    description: string;
  }[];
};

const sharedAdmissions: AdmissionsPanel[] = [
  {
    degree: "Bachelor",
    language: "English-taught",
    tuition: "RMB 26,000 - 38,000 / year",
    duration: "4 years",
    intake: "September",
    deadline: "March 1 - May 31",
    languageRequirement: "IELTS 6.0 or TOEFL 80+",
    academicRequirement: "Strong secondary school transcript and graduation certificate",
    requiredDocuments: [
      "Passport copy",
      "High school transcript",
      "Personal statement",
      "Two recommendation letters",
    ],
    scholarship: "CSC, university merit scholarship, first-year tuition reduction",
    note: "Best for applicants targeting business, engineering, or international foundation pathways.",
  },
  {
    degree: "Bachelor",
    language: "Chinese-taught",
    tuition: "RMB 22,000 - 32,000 / year",
    duration: "4 years",
    intake: "September",
    deadline: "February 15 - May 15",
    languageRequirement: "HSK 5 or above",
    academicRequirement: "High school diploma with competitive grades in core subjects",
    requiredDocuments: [
      "Passport copy",
      "High school diploma",
      "HSK certificate",
      "Foreigner physical examination form",
    ],
    scholarship: "CSC, provincial scholarship, campus living stipend",
    note: "Chinese-medium routes usually have more major choices and lower annual tuition.",
  },
  {
    degree: "Master",
    language: "English-taught",
    tuition: "RMB 33,000 - 48,000 / year",
    duration: "2 - 3 years",
    intake: "September",
    deadline: "January 1 - April 30",
    languageRequirement: "IELTS 6.5 or TOEFL 90+",
    academicRequirement: "Bachelor degree, good GPA, research fit with target faculty",
    requiredDocuments: [
      "Bachelor transcript",
      "Study plan",
      "CV",
      "Two academic references",
    ],
    scholarship: "CSC full scholarship, teaching assistantship, lab funding for research tracks",
    note: "A good fit for students comparing taught programs with research-led tracks.",
  },
  {
    degree: "Master",
    language: "Chinese-taught",
    tuition: "RMB 28,000 - 40,000 / year",
    duration: "2 - 3 years",
    intake: "September",
    deadline: "December 15 - April 15",
    languageRequirement: "HSK 5-6 depending on major",
    academicRequirement: "Relevant bachelor background and entrance review by faculty",
    requiredDocuments: [
      "Bachelor diploma",
      "Transcript",
      "Research proposal or study plan",
      "HSK certificate",
    ],
    scholarship: "CSC and internal graduate scholarship packages",
    note: "Chinese-medium graduate programs often open stronger access to supervisors and labs.",
  },
  {
    degree: "PhD",
    language: "English-taught",
    tuition: "RMB 38,000 - 52,000 / year",
    duration: "4 years",
    intake: "September",
    deadline: "December 1 - March 31",
    languageRequirement: "IELTS 6.5+ or TOEFL 90+, supervisor approval preferred",
    academicRequirement: "Relevant master degree, research proposal, publication record preferred",
    requiredDocuments: [
      "Master transcript",
      "Detailed research proposal",
      "Academic CV",
      "Potential supervisor communication record",
    ],
    scholarship: "Full scholarship packages are common for strong applicants",
    note: "This should visually signal research depth, supervisor fit, and funding opportunity.",
  },
  {
    degree: "PhD",
    language: "Chinese-taught",
    tuition: "RMB 32,000 - 45,000 / year",
    duration: "4 years",
    intake: "September",
    deadline: "December 1 - March 15",
    languageRequirement: "HSK 6 typically expected",
    academicRequirement: "Master degree in a related field and faculty review",
    requiredDocuments: [
      "Master diploma",
      "Research plan",
      "Published work if available",
      "HSK certificate",
    ],
    scholarship: "CSC, university doctoral assistantship, supervisor-backed funding",
    note: "Chinese-track doctoral candidates usually benefit from stronger local research integration.",
  },
];

export const universityPreviewData: UniversityPreview[] = [
  {
    slug: "peking-university",
    englishName: "Peking University",
    chineseName: "北京大学",
    city: "Beijing",
    region: "North China",
    establishedYear: 1898,
    website: "https://www.pku.edu.cn",
    tuitionRange: "RMB 22,000 - 52,000 / year",
    heroSummary:
      "A flagship comprehensive university with standout strength in humanities, social sciences, medicine, and frontier research.",
    overview:
      "This preview page treats the university detail page as both a trust-building brand page and a decision page. Peking University works especially well as the benchmark experience because it has strong rankings, a clear global reputation, and enough academic breadth to justify degree and language segmentation.",
    cityPitch:
      "Beijing adds policy, internships, museums, embassies, and a dense concentration of top universities, which makes the page feel more useful when city context is part of the story.",
    campusHighlights: [
      "Historic Yanyuan campus with high brand recognition",
      "Strong exchange ecosystem and international student support",
      "Excellent fit for economics, public policy, Chinese studies, and medicine",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#14", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#13", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public research university" },
      { label: "Primary strength", value: "Comprehensive academic breadth" },
      { label: "Campus language mix", value: "Chinese-first with strong international programs" },
      { label: "Best for", value: "Applicants seeking prestige plus broad major choice" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Chinese Government Scholarship",
        description: "Best shown as the main scholarship route for degree-seeking international applicants.",
      },
      {
        title: "University Merit Award",
        description: "Useful for partial tuition reduction and stronger conversion on the page.",
      },
      {
        title: "Research Funding Track",
        description: "Especially relevant for master's and PhD preview cards.",
      },
    ],
    studentLife: [
      {
        title: "Academic culture",
        description: "A serious, high-performing environment with broad intellectual communities across disciplines.",
      },
      {
        title: "Beijing access",
        description: "Internships, conferences, policy institutions, and cultural resources make the location itself part of the value proposition.",
      },
      {
        title: "International experience",
        description: "The page should reassure students that support, peer networks, and English-facing resources exist beyond the admissions office.",
      },
    ],
  },
  {
    slug: "tsinghua-university",
    englishName: "Tsinghua University",
    chineseName: "清华大学",
    city: "Beijing",
    region: "North China",
    establishedYear: 1911,
    website: "https://www.tsinghua.edu.cn",
    tuitionRange: "RMB 24,000 - 55,000 / year",
    heroSummary:
      "Often the first name students associate with engineering, technology, architecture, and elite research in China.",
    overview:
      "Tsinghua is ideal for testing a detail page with a stronger engineering and innovation tone. The page can lean a bit more ambitious and technical while still keeping admissions information approachable.",
    cityPitch:
      "For many applicants, Beijing plus Tsinghua immediately communicates prestige, research intensity, and career momentum.",
    campusHighlights: [
      "Top-tier engineering and computer science reputation",
      "Strong employer recognition in China and globally",
      "Compelling choice for design, architecture, and deep-tech fields",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#17", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#12", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public research university" },
      { label: "Primary strength", value: "Engineering and technology" },
      { label: "Campus language mix", value: "Chinese core with selective English graduate offerings" },
      { label: "Best for", value: "Applicants prioritizing STEM reputation" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "CSC flagship funding",
        description: "Important for signaling affordability despite elite positioning.",
      },
      {
        title: "Department-based support",
        description: "Strong visual cue for research-led applicants evaluating lab fit.",
      },
      {
        title: "Innovation-track awards",
        description: "Useful to spotlight entrepreneurship and engineering competitions.",
      },
    ],
    studentLife: [
      {
        title: "Maker culture",
        description: "Students often care about labs, project teams, competitions, and campus innovation spaces.",
      },
      {
        title: "Cross-disciplinary energy",
        description: "A strong detail page should show that the university is not only technical but also increasingly interdisciplinary.",
      },
      {
        title: "Career signal",
        description: "This school should feel like a launchpad for research, tech, and leadership roles.",
      },
    ],
  },
  {
    slug: "fudan-university",
    englishName: "Fudan University",
    chineseName: "复旦大学",
    city: "Shanghai",
    region: "East China",
    establishedYear: 1905,
    website: "https://www.fudan.edu.cn",
    tuitionRange: "RMB 24,000 - 49,000 / year",
    heroSummary:
      "A leading Shanghai university known for strong academics, city connectivity, and a polished international profile.",
    overview:
      "Fudan is a good preview case for a more cosmopolitan university page. The content can lean into city life, employer access, and strong humanities-business-medicine coverage.",
    cityPitch:
      "Shanghai helps the page feel premium: students immediately understand business access, international lifestyle, and stronger English comfort.",
    campusHighlights: [
      "Strong medicine, business, economics, and journalism reputation",
      "Urban international-student appeal",
      "Excellent fit for applicants comparing Beijing vs Shanghai experiences",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#39", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#36", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public comprehensive university" },
      { label: "Primary strength", value: "Medicine, business, humanities" },
      { label: "Campus language mix", value: "Internationally friendly city context" },
      { label: "Best for", value: "Applicants wanting top academics plus Shanghai lifestyle" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Shanghai Government Scholarship",
        description: "A very useful item to surface because the city itself is a major attraction.",
      },
      {
        title: "Fudan excellent freshman scholarship",
        description: "Great as a compact card under the admissions section.",
      },
      {
        title: "School-level research support",
        description: "Especially persuasive for graduate leads and medicine-related applicants.",
      },
    ],
    studentLife: [
      {
        title: "City-first lifestyle",
        description: "Students can picture internships, public transit convenience, and a more global everyday environment.",
      },
      {
        title: "Balanced prestige",
        description: "The page should make the university feel rigorous without feeling inaccessible.",
      },
      {
        title: "Community fit",
        description: "A good detail page should hint at clubs, dorm life, and support for first-time students in China.",
      },
    ],
  },
  {
    slug: "shanghai-jiao-tong-university",
    englishName: "Shanghai Jiao Tong University",
    chineseName: "上海交通大学",
    city: "Shanghai",
    region: "East China",
    establishedYear: 1896,
    website: "https://www.sjtu.edu.cn",
    tuitionRange: "RMB 24,000 - 50,000 / year",
    heroSummary:
      "A highly respected research university with standout engineering, business, medicine, and strong Shanghai positioning.",
    overview:
      "This school gives the detail page a more structured, performance-oriented tone. It is a strong candidate for applicants comparing with Tsinghua and Fudan.",
    cityPitch:
      "Shanghai strengthens the value story around internships, startup access, and an internationally familiar environment.",
    campusHighlights: [
      "Excellent engineering and applied science profile",
      "Well-known Antai business school and strong graduate appeal",
      "Strong industry and innovation signal for career-minded students",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#45", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#52", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public research university" },
      { label: "Primary strength", value: "Engineering, business, medicine" },
      { label: "Campus language mix", value: "Strong graduate-level international exposure" },
      { label: "Best for", value: "Applicants seeking high-performance academics with Shanghai access" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Government scholarship routes",
        description: "Should be grouped with practical funding guidance and link-outs later.",
      },
      {
        title: "Graduate research assistant packages",
        description: "A strong proof point for master's and PhD conversion.",
      },
      {
        title: "Partner-school awards",
        description: "Helpful if later you support exchange or pathway-type applicants.",
      },
    ],
    studentLife: [
      {
        title: "Applied ambition",
        description: "The page should feel a bit sharper and more career-driven than the softer Fudan experience.",
      },
      {
        title: "Large campus ecosystem",
        description: "There is room to show labs, student organizations, and residential life at scale.",
      },
      {
        title: "Employer relevance",
        description: "Students evaluating ROI will care about this section more than generic campus marketing.",
      },
    ],
  },
  {
    slug: "zhejiang-university",
    englishName: "Zhejiang University",
    chineseName: "浙江大学",
    city: "Hangzhou",
    region: "East China",
    establishedYear: 1897,
    website: "https://www.zju.edu.cn",
    tuitionRange: "RMB 22,000 - 46,000 / year",
    heroSummary:
      "A broad, high-performing university in one of China's most innovative and livable cities.",
    overview:
      "Zhejiang University is perfect for showing that not every top choice has to be Beijing or Shanghai. The detail page can highlight quality of life, innovation, and strong all-round academics.",
    cityPitch:
      "Hangzhou adds a calmer but still ambitious city story with tech access and stronger lifestyle appeal.",
    campusHighlights: [
      "Balanced excellence across engineering, agriculture, medicine, and computing",
      "Strong innovation environment near major tech companies",
      "Attractive option for students wanting prestige with a different city vibe",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#49", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#47", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public comprehensive university" },
      { label: "Primary strength", value: "Engineering plus strong all-round academics" },
      { label: "Campus language mix", value: "Accessible for both Chinese and international applicants" },
      { label: "Best for", value: "Applicants wanting prestige, balance, and lifestyle" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Provincial funding options",
        description: "This becomes more important because Hangzhou is a strong city differentiator.",
      },
      {
        title: "International excellence scholarship",
        description: "Works well as a mid-page card with quick eligibility notes.",
      },
      {
        title: "Innovation project support",
        description: "Useful for making the page feel more outcome-oriented.",
      },
    ],
    studentLife: [
      {
        title: "Quality-of-life advantage",
        description: "This school should feel more livable and balanced, not just prestigious.",
      },
      {
        title: "Tech adjacency",
        description: "A major draw for students interested in entrepreneurship, data, and product ecosystems.",
      },
      {
        title: "Broader campus story",
        description: "The page has room to show green campuses, facilities, and a slightly less intense atmosphere.",
      },
    ],
  },
  {
    slug: "ustc",
    englishName: "University of Science and Technology of China",
    chineseName: "中国科学技术大学",
    city: "Hefei",
    region: "East China",
    establishedYear: 1958,
    website: "https://www.ustc.edu.cn",
    tuitionRange: "RMB 24,000 - 44,000 / year",
    heroSummary:
      "A research-heavy choice especially attractive to science-focused and academically ambitious applicants.",
    overview:
      "USTC helps test how the page handles a less lifestyle-driven but extremely respected academic brand. The content can be more research-first and intellectually serious.",
    cityPitch:
      "Hefei may be less internationally familiar, so the city section should work harder to explain why students still choose it.",
    campusHighlights: [
      "Very strong in physics, mathematics, AI, and scientific research",
      "High signal for applicants prioritizing labs and pure research",
      "Distinct identity compared with more city-led universities",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#133", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#53", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public science-focused research university" },
      { label: "Primary strength", value: "Fundamental science and research" },
      { label: "Campus language mix", value: "Graduate and research-heavy international positioning" },
      { label: "Best for", value: "Applicants optimizing for academic depth over city prestige" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Research-track funding",
        description: "This should be emphasized more strongly here than at broader universities.",
      },
      {
        title: "Graduate scholarship package",
        description: "Ideal for graduate applicants comparing cost with research opportunity.",
      },
      {
        title: "Science talent support",
        description: "Useful as a positioning element even before real scholarship data is added.",
      },
    ],
    studentLife: [
      {
        title: "Research-first atmosphere",
        description: "The page should make clear that this is a strong academic fit, not a generic city lifestyle pick.",
      },
      {
        title: "Focused student community",
        description: "Students often care whether they will find peers who are similarly serious and technically oriented.",
      },
      {
        title: "Value story",
        description: "A more affordable city can be positioned as a practical advantage rather than a compromise.",
      },
    ],
  },
  {
    slug: "nanjing-university",
    englishName: "Nanjing University",
    chineseName: "南京大学",
    city: "Nanjing",
    region: "East China",
    establishedYear: 1902,
    website: "https://www.nju.edu.cn",
    tuitionRange: "RMB 22,000 - 43,000 / year",
    heroSummary:
      "A historic and respected university known for strong academics, especially in sciences and humanities.",
    overview:
      "Nanjing University gives the page a scholarly, heritage-rich tone. It is a good case for users who care about academic culture more than flashy brand presentation.",
    cityPitch:
      "Nanjing is easier to explain than smaller cities because it offers history, good transport, and a calmer pace than Beijing or Shanghai.",
    campusHighlights: [
      "Strong science and humanities reputation",
      "Historic prestige with a more understated public image",
      "Good fit for applicants seeking serious academics in a livable city",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#145", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#65", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public comprehensive university" },
      { label: "Primary strength", value: "Sciences and humanities" },
      { label: "Campus language mix", value: "Traditional academic culture with growing international pathways" },
      { label: "Best for", value: "Applicants seeking depth, heritage, and a calmer city" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Provincial scholarship",
        description: "Useful context for students comparing total study cost across cities.",
      },
      {
        title: "Graduate merit aid",
        description: "Should sit near admissions to reduce friction in the decision flow.",
      },
      {
        title: "Supervisor-backed support",
        description: "Especially persuasive for research-heavy degrees.",
      },
    ],
    studentLife: [
      {
        title: "Historic academic tone",
        description: "This is a school where atmosphere and tradition matter to the user experience.",
      },
      {
        title: "Livable city rhythm",
        description: "Nanjing works well for students who want less pressure than Beijing or Shanghai without sacrificing quality.",
      },
      {
        title: "Cultural context",
        description: "The page could later highlight museums, neighborhoods, and day-to-day life to help students imagine themselves there.",
      },
    ],
  },
  {
    slug: "xian-jiaotong-university",
    englishName: "Xi’an Jiaotong University",
    chineseName: "西安交通大学",
    city: "Xi’an",
    region: "Northwest China",
    establishedYear: 1896,
    website: "https://www.xjtu.edu.cn",
    tuitionRange: "RMB 20,000 - 40,000 / year",
    heroSummary:
      "A strong engineering-led university with a compelling value story and a city rich in history.",
    overview:
      "Xi’an Jiaotong is a good preview for a page that needs to sell both academic credibility and overlooked-city value. It should feel dependable rather than flashy.",
    cityPitch:
      "Xi’an gives you a strong cultural story and lower living costs, which are powerful conversion points for many applicants.",
    campusHighlights: [
      "Strong engineering and applied sciences identity",
      "Cost-effective option among elite universities",
      "Interesting city narrative for students wanting a deeper China experience",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#295", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#151-160", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public research university" },
      { label: "Primary strength", value: "Engineering and applied science" },
      { label: "Campus language mix", value: "Chinese-led with selective international routes" },
      { label: "Best for", value: "Applicants who care about value, rigor, and cultural immersion" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Affordable-city advantage",
        description: "This should be treated almost like a financial aid card because it changes perceived value.",
      },
      {
        title: "CSC and university grants",
        description: "Important to show that elite options exist beyond the most famous cities.",
      },
      {
        title: "Engineering project support",
        description: "Adds relevance for applied and research-oriented prospects.",
      },
    ],
    studentLife: [
      {
        title: "Historical city depth",
        description: "Xi’an can be a differentiator when framed as culture plus affordability, not as a second-tier fallback.",
      },
      {
        title: "Grounded campus experience",
        description: "The design can feel more practical and student-centered here.",
      },
      {
        title: "Budget-friendly fit",
        description: "Cost of living deserves more explicit treatment on this type of page later.",
      },
    ],
  },
  {
    slug: "harbin-institute-of-technology",
    englishName: "Harbin Institute of Technology",
    chineseName: "哈尔滨工业大学",
    city: "Harbin",
    region: "Northeast China",
    establishedYear: 1920,
    website: "https://www.hit.edu.cn",
    tuitionRange: "RMB 20,000 - 39,000 / year",
    heroSummary:
      "A highly respected engineering university with a distinctive northern-city identity and serious technical reputation.",
    overview:
      "HIT helps preview how the page can work for a school with strong technical prestige but a more niche geographic appeal. The page should make the school's strengths feel undeniable.",
    cityPitch:
      "Harbin requires context, so the city section should explain climate, cost, and local character rather than relying on name recognition.",
    campusHighlights: [
      "Strong aerospace, robotics, civil engineering, and advanced manufacturing profile",
      "High-value option for technical applicants",
      "Distinctive campus and city identity compared with southern universities",
    ],
    tags: ["985", "211", "C9"],
    rankings: [
      { system: "QS", year: 2026, rank: "#252", label: "Global Ranking" },
      { system: "THE", year: 2026, rank: "#152", label: "World University Ranking" },
    ],
    quickFacts: [
      { label: "Type", value: "Public engineering research university" },
      { label: "Primary strength", value: "Aerospace and advanced engineering" },
      { label: "Campus language mix", value: "Research- and engineering-centered" },
      { label: "Best for", value: "Applicants seeking serious technical reputation and value" },
    ],
    admissions: sharedAdmissions,
    scholarships: [
      {
        title: "Technical talent funding",
        description: "A good way to make the school feel especially attractive for STEM profiles.",
      },
      {
        title: "Graduate research awards",
        description: "Useful for reinforcing supervisor-led pathways later.",
      },
      {
        title: "Tuition and living-cost value",
        description: "The affordability message should be explicit rather than implied.",
      },
    ],
    studentLife: [
      {
        title: "Technical intensity",
        description: "Students should quickly understand that this is a hands-on, rigorous environment.",
      },
      {
        title: "Distinct climate and culture",
        description: "Harbin should feel unique, not like a generic city placeholder.",
      },
      {
        title: "Practical appeal",
        description: "Strong for applicants who prioritize engineering outcomes over city glamour.",
      },
    ],
  },
];

export function getUniversityPreviewBySlug(slug: string) {
  return universityPreviewData.find((item) => item.slug === slug);
}
