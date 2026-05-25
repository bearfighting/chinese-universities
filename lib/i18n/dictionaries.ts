import { defaultLocale, type Locale } from "@/lib/i18n/config";

const dictionaries = {
  en: {
    nav: {
      brandAriaLabel: "Chinese Universities home",
      brandTitle: "Chinese Universities",
      brandSubtitle: "Explore, compare, and plan your study path",
      links: {
        universities: "Universities",
        rankings: "Rankings",
        locations: "Locations",
        majors: "Majors",
        scholarships: "Scholarships",
        guides: "Guides",
        blog: "Blog",
      },
      searchLabel: "Search",
      searchPlaceholder: "Search universities, rankings, provinces, majors...",
      searchShort: "Search universities...",
      openNavigationMenu: "Open navigation menu",
      navigate: "Navigate",
      current: "Current",
      language: "Language",
      english: "English",
      chinese: "中文",
    },
    home: {
      badge: "Study in China",
      title: "Explore top universities in China with a clear starting point.",
      description:
        "Discover leading university groups, compare major cities, and start with the institutions most students research first.",
      browseUniversities: "Browse Universities",
      exploreC9: "Explore C9 League",
      groupsTitle: "Start with key university groups",
      groupsDescription:
        "These categories help organize China's higher education landscape before you dive into individual schools.",
      featuredTitle: "Featured universities",
      featuredDescription:
        "A few of the most recognized universities in China, starting with well-known members of the C9 League.",
      citiesTitle: "Browse by city",
      citiesDescription:
        "Many students choose a city first, then compare universities within that region.",
      cityLabel: "City",
      officialSite: "Official Site",
      viewDetails: "View Details",
      viewGroup: "View Group",
    },
    universities: {
      heroBadge: "China Universities",
      heroTitle: "Discover universities in China",
      heroDescription:
        "Explore universities through classifications, rankings, and location, then refine your shortlist with more academic filters as new data is added.",
      listBadge: "Classifications",
      listTitle: "Browse universities by category",
      listDescription:
        "Open one classification at a time to compare schools inside that group. This keeps the page compact now and scales better as more universities are added.",
      groupFallbackDescription: "University classification group",
      universitiesCount: "universities",
      cityLabel: "City",
      unknownCity: "Unknown",
      officialSite: "Official Site",
      viewDetails: "View Details",
    },
    universityDetail: {
      hero: {
        city: "City",
        region: "Region",
        tuitionRange: "Tuition range",
        founded: "Founded",
        officialWebsite: "Official Website",
        backToUniversities: "Back to Universities",
        campusView: "Campus view",
        featured: "Featured",
        rankingSnapshot: "Ranking Snapshot",
        rankingDescription:
          "A compact version of the top-of-page summary card you can reuse across all schools.",
      },
      overview: {
        badge: "Overview",
        title: "Why this university stands out",
        description:
          "This section helps the page feel editorial and useful before the user reaches the admissions detail.",
        cityAdvantage: "City advantage",
        campusHighlights: "Campus highlights",
        quickFacts: "Quick facts",
      },
      admissions: {
        badge: "Admissions Requirements",
        titleReal: "Admissions requirements and application path",
        titleFallback: "Degree and language tabs preview",
        descriptionReal:
          "Switch between the available degree and language combinations to view deadlines, requirements, and document lists from the current admissions dataset.",
        descriptionFallback:
          "This is a static mock, but the interaction model is real. It is a good way to test readability before wiring the database.",
        degreeLevel: "Degree level",
        teachingLanguage: "Teaching language",
        tuition: "Tuition",
        programDuration: "Program duration",
        intake: "Intake",
        applicationDeadline: "Application deadline",
        languageRequirement: "Language requirement",
        academicRequirement: "Academic requirement",
        currentPath: "Current path",
        requiredDocuments: "Required documents",
        scholarshipAngle: "Scholarship angle",
      },
      secondary: {
        scholarshipsBadge: "Scholarships",
        scholarshipTitleReal: "Scholarships for international applicants",
        scholarshipTitleFallback: "Funding should be visible, not buried",
        scholarshipDescriptionReal:
          "These scholarship options are pulled from the current admissions data available for this university.",
        scholarshipDescriptionFallback:
          "Even before the data is real, showing the layout helps us test whether the page feels actionable.",
        studentLifeBadge: "Student Life",
        studentLifeTitle: "The page should help users imagine living there",
        studentLifeDescription:
          "This section gives emotional depth so the page is not only a database dump.",
      },
    },
  },
  zh: {
    nav: {
      brandAriaLabel: "中国大学首页",
      brandTitle: "中国大学",
      brandSubtitle: "探索、比较并规划你的留学路径",
      links: {
        universities: "大学",
        rankings: "排名",
        locations: "城市",
        majors: "专业",
        scholarships: "奖学金",
        guides: "指南",
        blog: "博客",
      },
      searchLabel: "搜索",
      searchPlaceholder: "搜索大学、排名、省份、专业……",
      searchShort: "搜索大学……",
      openNavigationMenu: "打开导航菜单",
      navigate: "导航",
      current: "当前",
      language: "语言",
      english: "English",
      chinese: "中文",
    },
    home: {
      badge: "来华留学",
      title: "寻找梦想的中国大学从此开始",
      description: "您可以按类别、城市等找到您心仪的大学。",
      browseUniversities: "浏览大学",
      exploreC9: "查看 C9 联盟",
      groupsTitle: "快速读懂中国名校体系",
      groupsDescription:
        "面对众多高校不知从何看起？掌握这几个核心标签，帮你迅速理清中国大学的层级，轻松找到最适合你的目标院校。",
      featuredTitle: "重点大学",
      featuredDescription:
        "先从几所最有代表性的中国大学开始，包括广为人知的 C9 联盟成员。",
      citiesTitle: "按城市浏览",
      citiesDescription: "很多学生会先确定城市，再比较该地区内的大学。",
      cityLabel: "城市",
      officialSite: "官网",
      viewDetails: "查看详情",
      viewGroup: "查看分组",
    },
    universities: {
      heroBadge: "中国大学",
      heroTitle: "发现中国大学",
      heroDescription:
        "先从分类、排名和城市切入，再随着数据逐步完善，继续缩小你的学校名单。",
      listBadge: "分类",
      listTitle: "探索中国顶尖大学联盟与特色院校",
      listDescription:
        "按学术联盟、专业特色或地区分类，快速找到最适合您的学校。",
      groupFallbackDescription: "大学分类",
      universitiesCount: "所大学",
      cityLabel: "城市",
      unknownCity: "未知",
      officialSite: "官网",
      viewDetails: "查看详情",
    },
    universityDetail: {
      hero: {
        city: "城市",
        region: "地区",
        tuitionRange: "学费范围",
        founded: "建校时间",
        officialWebsite: "官方网站",
        backToUniversities: "返回大学列表",
        campusView: "校园景观",
        featured: "推荐",
        rankingSnapshot: "排名概览",
        rankingDescription: "这是一个可在各校复用的顶部摘要卡片。",
      },
      overview: {
        badge: "概览",
        title: "为什么这所大学值得关注",
        description: "这一部分会在用户进入招生细节前，先建立整体理解。",
        cityAdvantage: "城市优势",
        campusHighlights: "校园亮点",
        quickFacts: "快速信息",
      },
      admissions: {
        badge: "招生要求",
        titleReal: "招生要求与申请路径",
        titleFallback: "学位与授课语言切换预览",
        descriptionReal:
          "切换可选的学位和授课语言组合，以查看当前招生数据中的截止时间、要求和材料清单。",
        descriptionFallback:
          "这部分目前仍可作为交互预览，用来在接入数据库前测试可读性。",
        degreeLevel: "学位层次",
        teachingLanguage: "授课语言",
        tuition: "学费",
        programDuration: "学制",
        intake: "入学时间",
        applicationDeadline: "申请截止时间",
        languageRequirement: "语言要求",
        academicRequirement: "学术要求",
        currentPath: "当前路径",
        requiredDocuments: "申请材料",
        scholarshipAngle: "奖学金信息",
      },
      secondary: {
        scholarshipsBadge: "奖学金",
        scholarshipTitleReal: "国际学生奖学金",
        scholarshipTitleFallback: "奖助信息不应被埋没",
        scholarshipDescriptionReal:
          "这些奖学金信息来自该校当前可用的招生数据。",
        scholarshipDescriptionFallback:
          "即使数据还不完整，这种版式也能帮助我们判断页面是否足够实用。",
        studentLifeBadge: "学生生活",
        studentLifeTitle: "页面应帮助用户想象在这里生活",
        studentLifeDescription:
          "这一部分增加情感和生活感，而不只是信息堆砌。",
      },
    },
  },
} as const;

export type AppDictionary = (typeof dictionaries)[typeof defaultLocale];

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale];
}
