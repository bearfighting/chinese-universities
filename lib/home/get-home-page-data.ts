import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  classifications,
  universities,
  university_classifications,
  university_rankings,
} from "@/lib/db/schema";
import type { Locale } from "@/lib/i18n/config";
import {
  pickPrimaryRanking,
  toUniversityRankingView,
  type UniversityRankingView,
} from "@/lib/university-rankings";

const trackedClassificationCodes = [
  "C9",
  "985",
  "211",
  "DOUBLE_FIRST_CLASS",
] as const;

type RankingRecord = {
  universityId: string;
  system: string;
  year: number;
  rankFrom: number | null;
  rankTo: number | null;
  rankText: string | null;
  sourceUrl: string | null;
};

export type HomeClassificationGroup = {
  code: string;
  name: string;
  fullName: string | null;
  description: string;
  universityCount: number;
};

export type HomeFeaturedUniversity = {
  id: string;
  name: string | null;
  chineseName: string;
  city: string | null;
  slug: string | null;
  website: string | null;
  primaryRanking: UniversityRankingView | null;
};

export type HomeCity = {
  cityEn: string;
  cityZh: string | null;
  universityCount: number;
  featuredSchoolNames: string[];
};

export type HomePageData = {
  classificationGroups: HomeClassificationGroup[];
  featuredUniversities: HomeFeaturedUniversity[];
  cities: HomeCity[];
};

function parseRankValue(record: RankingRecord | undefined) {
  if (!record) {
    return Number.MAX_SAFE_INTEGER;
  }

  if (record.rankFrom !== null) {
    return record.rankFrom;
  }

  if (record.rankText) {
    const parsed = Number.parseInt(record.rankText, 10);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return Number.MAX_SAFE_INTEGER;
}

export async function getHomePageData(locale: Locale): Promise<HomePageData> {
  const classificationGroups = await db
    .select({
      code: classifications.code,
      name: locale === "zh" ? classifications.name_zh : classifications.name_en,
      fullName:
        locale === "zh"
          ? classifications.full_name_zh
          : classifications.full_name_en,
      description:
        locale === "zh"
          ? classifications.description_zh
          : classifications.description_en,
      universityCount:
        sql<number>`count(distinct ${university_classifications.university_id})`.mapWith(
          Number,
        ),
      sortOrder: classifications.sort_order,
    })
    .from(classifications)
    .leftJoin(
      university_classifications,
      eq(classifications.id, university_classifications.classification_id),
    )
    .where(inArray(classifications.code, trackedClassificationCodes))
    .groupBy(
      classifications.code,
      classifications.name_en,
      classifications.name_zh,
      classifications.full_name_en,
      classifications.full_name_zh,
      classifications.description_en,
      classifications.description_zh,
      classifications.sort_order,
    )
    .orderBy(asc(classifications.sort_order))
    .then((rows) =>
      rows.map((group) => ({
        code: group.code,
        name: group.name,
        fullName: group.fullName,
        description: group.description,
        universityCount: group.universityCount,
      })),
    );

  const featuredRows = await db
    .select({
      id: universities.id,
      name: universities.name_en,
      chineseName: universities.name,
      city: locale === "zh" ? universities.city_zh : universities.city_en,
      slug: universities.slug,
      website: universities.website,
    })
    .from(universities)
    .innerJoin(
      university_classifications,
      eq(universities.id, university_classifications.university_id),
    )
    .innerJoin(
      classifications,
      and(
        eq(classifications.id, university_classifications.classification_id),
        eq(classifications.code, "C9"),
      ),
    )
    .orderBy(asc(universities.name_en), asc(universities.name));

  const featuredUniversityIds = featuredRows.map((row) => row.id);

  const featuredRankings =
    featuredUniversityIds.length > 0
      ? await db
          .select({
            universityId: university_rankings.university_id,
            system: university_rankings.system,
            year: university_rankings.year,
            rankFrom: university_rankings.rank_from,
            rankTo: university_rankings.rank_to,
            rankText: university_rankings.rank_text,
            sourceUrl: university_rankings.source_url,
          })
          .from(university_rankings)
          .where(inArray(university_rankings.university_id, featuredUniversityIds))
      : [];

  const rankingsByUniversity = new Map<string, RankingRecord[]>();

  for (const ranking of featuredRankings) {
    const current = rankingsByUniversity.get(ranking.universityId) ?? [];
    current.push(ranking);
    rankingsByUniversity.set(ranking.universityId, current);
  }

  const featuredUniversities = featuredRows
    .map((row) => {
      const primaryRanking = pickPrimaryRanking(
        rankingsByUniversity.get(row.id) ?? [],
      );

      return {
        id: row.id,
        name: row.name,
        chineseName: row.chineseName,
        city: row.city,
        slug: row.slug,
        website: row.website,
        primaryRanking: primaryRanking
          ? toUniversityRankingView(primaryRanking)
          : null,
        rankingValue: parseRankValue(primaryRanking),
      };
    })
    .sort((left, right) => {
      if (left.rankingValue !== right.rankingValue) {
        return left.rankingValue - right.rankingValue;
      }

      return (left.name ?? left.chineseName).localeCompare(
        right.name ?? right.chineseName,
      );
    })
    .slice(0, 3)
    .map((university) => ({
      id: university.id,
      name: university.name,
      chineseName: university.chineseName,
      city: university.city,
      slug: university.slug,
      website: university.website,
      primaryRanking: university.primaryRanking,
    }));

  const cityRows = await db
    .select({
      cityEn: universities.city_en,
      cityZh: universities.city_zh,
      universityCount: sql<number>`count(*)`.mapWith(Number),
    })
    .from(universities)
    .groupBy(universities.city_en, universities.city_zh)
    .orderBy(desc(sql`count(*)`), asc(universities.city_en))
    .limit(6);

  const citySchoolRows =
    cityRows.length > 0
      ? await db
          .select({
            cityEn: universities.city_en,
            name: universities.name_en,
            chineseName: universities.name,
          })
          .from(universities)
          .where(
            inArray(
              universities.city_en,
              cityRows.map((row) => row.cityEn),
            ),
          )
          .orderBy(asc(universities.city_en), asc(universities.name_en))
      : [];

  const schoolsByCity = new Map<
    string,
    { name: string | null; chineseName: string }[]
  >();

  for (const school of citySchoolRows) {
    const current = schoolsByCity.get(school.cityEn) ?? [];
    current.push({
      name: school.name,
      chineseName: school.chineseName,
    });
    schoolsByCity.set(school.cityEn, current);
  }

  const cities = cityRows.map((city) => ({
    cityEn: city.cityEn,
    cityZh: city.cityZh,
    universityCount: city.universityCount,
    featuredSchoolNames: (schoolsByCity.get(city.cityEn) ?? [])
      .slice(0, 3)
      .map((school) =>
        locale === "zh" ? school.chineseName : school.name ?? school.chineseName,
      ),
  }));

  return {
    classificationGroups,
    featuredUniversities,
    cities,
  };
}
