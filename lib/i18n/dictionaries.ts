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
  },
} as const;

export type AppDictionary = (typeof dictionaries)[typeof defaultLocale];

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale];
}
