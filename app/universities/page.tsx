import { asc, eq, inArray } from "drizzle-orm";
import { connection } from "next/server";

import UniversitiesHero from "@/components/university/universities-hero";
import UniversitiesListSection from "@/components/university/universities-list-section";
import { db } from "@/lib/db";
import {
  classifications,
  universities,
  university_classifications,
  university_rankings,
} from "@/lib/db/schema";
import {
  pickPrimaryRanking,
  toUniversityRankingView,
} from "@/lib/university-rankings";

export default async function UniversitiesPage() {
  await connection();

  const c9Universities = await db
    .select({
      id: universities.id,
      chineseName: universities.name,
      name: universities.name_en,
      city: universities.city,
      slug: universities.slug,
      website: universities.website,
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
    .where(eq(classifications.code, "C9"))
    .orderBy(asc(universities.name_en));

  const universityIds = c9Universities.map((university) => university.id);

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

  const universitiesWithRankings = c9Universities.map((university) => {
    const primaryRanking = pickPrimaryRanking(
      rankingsByUniversity.get(university.id) ?? [],
    );

    return {
      ...university,
      primaryRanking: primaryRanking
        ? toUniversityRankingView(primaryRanking)
        : null,
    };
  });

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <UniversitiesHero />
        <UniversitiesListSection universities={universitiesWithRankings} />
      </section>
    </main>
  );
}
