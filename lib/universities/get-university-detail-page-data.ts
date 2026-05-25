import { asc, eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import {
  classifications,
  universities,
  university_admission_documents,
  university_admission_events,
  university_admission_tracks,
  university_classifications,
  university_mottos,
  university_profiles,
  university_rankings,
  university_scholarships,
} from "@/lib/db/schema";
import {
  getUniversityPreviewBySlug,
  type UniversityPreview,
} from "@/lib/university-preview-data";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { toUniversityRankingView } from "@/lib/university-rankings";
import {
  mapAdmissionsPanels,
  toFallbackUniversityPreview,
} from "@/lib/universities/university-detail-mappers";

const classificationDisplayOrder = [
  "C9",
  "985",
  "211",
  "DOUBLE_FIRST_CLASS",
] as const;

export type UniversityDetailPageData = {
  university: UniversityPreview;
  rankings: ReturnType<typeof toUniversityRankingView>[];
  classifications: string[];
};

export async function getUniversityDetailPageData(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<UniversityDetailPageData> {
  const previewUniversity = getUniversityPreviewBySlug(slug);

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

  const mottoRowPromise = db
    .select()
    .from(university_mottos)
    .where(eq(university_mottos.university_id, databaseUniversity.id))
    .limit(1)
    .then((rows) => rows[0] ?? null)
    .catch(() => null);

  const [
    rankings,
    classificationRows,
    mottoRow,
    [profileRow],
    admissionTracks,
    scholarshipRows,
  ] = await Promise.all([
    db
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
      .orderBy(asc(university_rankings.system), asc(university_rankings.year)),
    db
      .select({
        code: classifications.code,
      })
      .from(university_classifications)
      .innerJoin(
        classifications,
        eq(classifications.id, university_classifications.classification_id),
      )
      .where(eq(university_classifications.university_id, databaseUniversity.id))
      .orderBy(asc(classifications.code)),
    mottoRowPromise,
    db
      .select()
      .from(university_profiles)
      .where(eq(university_profiles.university_id, databaseUniversity.id))
      .limit(1),
    db
      .select()
      .from(university_admission_tracks)
      .where(eq(university_admission_tracks.university_id, databaseUniversity.id))
      .orderBy(
        asc(university_admission_tracks.academic_year),
        asc(university_admission_tracks.degree_level),
        asc(university_admission_tracks.track_code),
      ),
    db
      .select()
      .from(university_scholarships)
      .where(eq(university_scholarships.university_id, databaseUniversity.id))
      .orderBy(
        asc(university_scholarships.academic_year),
        asc(university_scholarships.sort_order),
      ),
  ]);

  const trackIds = admissionTracks.map((track) => track.id);
  const [admissionEvents, admissionDocuments] =
    trackIds.length > 0
      ? await Promise.all([
          db
            .select()
            .from(university_admission_events)
            .where(
              inArray(university_admission_events.admission_track_id, trackIds),
            )
            .orderBy(
              asc(university_admission_events.admission_track_id),
              asc(university_admission_events.sort_order),
            ),
          db
            .select()
            .from(university_admission_documents)
            .where(
              inArray(
                university_admission_documents.admission_track_id,
                trackIds,
              ),
            )
            .orderBy(
              asc(university_admission_documents.admission_track_id),
              asc(university_admission_documents.sort_order),
            ),
        ])
      : [[], []];

  const fallbackUniversity =
    previewUniversity ?? toFallbackUniversityPreview(databaseUniversity);

  const university = {
    ...fallbackUniversity,
    slug: databaseUniversity.slug ?? fallbackUniversity.slug,
    englishName:
      databaseUniversity.englishName ?? fallbackUniversity.englishName,
    chineseName:
      databaseUniversity.chineseName ?? fallbackUniversity.chineseName,
    mottoZh: mottoRow?.motto_zh ?? fallbackUniversity.mottoZh ?? null,
    mottoEn: mottoRow?.motto_en ?? fallbackUniversity.mottoEn ?? null,
    city: databaseUniversity.city ?? fallbackUniversity.city,
    region: databaseUniversity.region ?? fallbackUniversity.region,
    establishedYear:
      databaseUniversity.establishedYear ?? fallbackUniversity.establishedYear,
    website: databaseUniversity.website ?? fallbackUniversity.website,
    tuitionRange: profileRow?.tuition_summary ?? fallbackUniversity.tuitionRange,
    heroSummary: profileRow?.hero_summary ?? fallbackUniversity.heroSummary,
    overview:
      (locale === "zh"
        ? profileRow?.overview_zh
        : profileRow?.overview_en ?? profileRow?.overview) ??
      fallbackUniversity.overview,
    cityPitch: profileRow?.city_pitch ?? fallbackUniversity.cityPitch,
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
      : fallbackUniversity.rankings.map((ranking) => ({
          ...ranking,
          sourceUrl: null,
        }));

  const admissions =
    admissionTracks.length > 0
      ? mapAdmissionsPanels(admissionTracks, admissionEvents, admissionDocuments)
      : fallbackUniversity.admissions;

  const scholarships =
    scholarshipRows.length > 0
      ? scholarshipRows.map((scholarship) => ({
          title: scholarship.name,
          description:
            [scholarship.coverage, scholarship.notes]
              .filter(Boolean)
              .join(" ")
              .trim() || "Scholarship details available in the source guide.",
        }))
      : fallbackUniversity.scholarships;

  return {
    university: {
      ...university,
      admissions,
      scholarships,
    },
    rankings: rankingViews,
    classifications: classificationDisplayOrder.filter((code) =>
      classificationRows.some((classification) => classification.code === code),
    ),
  };
}
