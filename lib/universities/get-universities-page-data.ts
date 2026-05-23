import { asc, eq, inArray } from "drizzle-orm";

import type { UniversityClassificationGroup } from "@/components/university/universities-list-section";
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
} from "@/lib/university-rankings";

const trackedClassificationCodes = [
  "C9",
  "985",
  "211",
  "DOUBLE_FIRST_CLASS",
] as const;

export async function getUniversitiesPageData(
  locale: Locale,
): Promise<UniversityClassificationGroup[]> {
  const universityRows = await db
    .select({
      id: universities.id,
      chineseName: universities.name,
      name: universities.name_en,
      city: locale === "zh" ? universities.city_zh : universities.city_en,
      slug: universities.slug,
      website: universities.website,
      classificationCode: classifications.code,
      classificationName:
        locale === "zh" ? classifications.name_zh : classifications.name_en,
      classificationFullName:
        locale === "zh"
          ? classifications.full_name_zh
          : classifications.full_name_en,
      classificationDescription:
        locale === "zh"
          ? classifications.description_zh
          : classifications.description_en,
    })
    .from(universities)
    .innerJoin(
      university_classifications,
      eq(university_classifications.university_id, universities.id),
    )
    .innerJoin(
      classifications,
      eq(classifications.id, university_classifications.classification_id),
    )
    .where(inArray(classifications.code, trackedClassificationCodes))
    .orderBy(
      asc(classifications.sort_order),
      asc(universities.name_en),
      asc(universities.name),
    );

  const universityIds = [...new Set(universityRows.map((row) => row.id))];

  const rankings =
    universityIds.length > 0
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
          .where(inArray(university_rankings.university_id, universityIds))
      : [];

  const rankingsByUniversity = new Map<string, typeof rankings>();

  for (const ranking of rankings) {
    const current = rankingsByUniversity.get(ranking.universityId) ?? [];
    current.push(ranking);
    rankingsByUniversity.set(ranking.universityId, current);
  }

  const classificationOrder = trackedClassificationCodes;
  const groupedUniversities = new Map<string, UniversityClassificationGroup>();

  for (const university of universityRows) {
    const primaryRanking = pickPrimaryRanking(
      rankingsByUniversity.get(university.id) ?? [],
    );

    const group = groupedUniversities.get(university.classificationCode) ?? {
      code: university.classificationCode,
      name: university.classificationName,
      fullName: university.classificationFullName,
      description: university.classificationDescription,
      universities: [],
    };

    group.universities.push({
      id: university.id,
      chineseName: university.chineseName,
      name: university.name,
      city: university.city,
      slug: university.slug,
      website: university.website,
      primaryRanking: primaryRanking
        ? toUniversityRankingView(primaryRanking)
        : null,
    });

    groupedUniversities.set(university.classificationCode, group);
  }

  return classificationOrder
    .map((code) => groupedUniversities.get(code))
    .filter((group): group is UniversityClassificationGroup => Boolean(group));
}
