import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import UniversityDetailPreview from "@/components/university/university-detail-preview";
import { db } from "@/lib/db";
import {
  classifications,
  universities,
  university_classifications,
  university_rankings,
} from "@/lib/db/schema";
import {
  getUniversityPreviewBySlug,
  universityPreviewData,
} from "@/lib/university-preview-data";
import { toUniversityRankingView } from "@/lib/university-rankings";

export async function generateStaticParams() {
  return universityPreviewData.map((university) => ({
    slug: university.slug,
  }));
}

export default async function UniversityDetailPage(
  props: PageProps<"/universities/[slug]">,
) {
  await connection();

  const { slug } = await props.params;
  const previewUniversity = getUniversityPreviewBySlug(slug);

  if (!previewUniversity) {
    notFound();
  }

  const [databaseUniversity] = await db
    .select({
      id: universities.id,
      englishName: universities.name_en,
      chineseName: universities.name,
      city: universities.city,
      region: universities.region,
      establishedYear: universities.established_year,
      website: universities.website,
      slug: universities.slug,
    })
    .from(universities)
    .where(eq(universities.slug, slug));

  if (!databaseUniversity) {
    notFound();
  }

  const rankings = await db
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
    .where(eq(university_rankings.university_id, databaseUniversity.id))
    .orderBy(asc(university_rankings.system), asc(university_rankings.year));

  const classificationRows = await db
    .select({
      code: classifications.code,
    })
    .from(university_classifications)
    .innerJoin(
      classifications,
      eq(classifications.id, university_classifications.classification_id),
    )
    .where(eq(university_classifications.university_id, databaseUniversity.id))
    .orderBy(asc(classifications.code));

  const university = {
    ...previewUniversity,
    slug: databaseUniversity.slug ?? previewUniversity.slug,
    englishName:
      databaseUniversity.englishName ?? previewUniversity.englishName,
    chineseName: databaseUniversity.chineseName ?? previewUniversity.chineseName,
    city: databaseUniversity.city ?? previewUniversity.city,
    region: databaseUniversity.region ?? previewUniversity.region,
    establishedYear:
      databaseUniversity.establishedYear ?? previewUniversity.establishedYear,
    website: databaseUniversity.website ?? previewUniversity.website,
  };

  const rankingViews =
    rankings.length > 0
      ? rankings
          .sort((left, right) => {
            if (left.year !== right.year) {
              return right.year - left.year;
            }

            return left.system.localeCompare(right.system);
          })
          .map(toUniversityRankingView)
      : previewUniversity.rankings.map((ranking) => ({
          ...ranking,
          sourceUrl: null,
        }));

  const classificationCodes = classificationRows.map(
    (classification) => classification.code,
  );

  return (
    <UniversityDetailPreview
      university={university}
      rankings={rankingViews}
      classifications={classificationCodes}
    />
  );
}
