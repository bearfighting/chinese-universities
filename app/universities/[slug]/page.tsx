import { asc, eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import UniversityDetailPreview from "@/components/university/university-detail-preview";
import { db } from "@/lib/db";
import {
  classifications,
  universities,
  university_admission_documents,
  university_admission_events,
  university_admission_tracks,
  university_classifications,
  university_profiles,
  university_rankings,
  university_scholarships,
} from "@/lib/db/schema";
import {
  type AdmissionsPanel,
  getUniversityPreviewBySlug,
  type UniversityPreview,
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

  const [
    rankings,
    classificationRows,
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
    city: databaseUniversity.city ?? fallbackUniversity.city,
    region: databaseUniversity.region ?? fallbackUniversity.region,
    establishedYear:
      databaseUniversity.establishedYear ?? fallbackUniversity.establishedYear,
    website: databaseUniversity.website ?? fallbackUniversity.website,
    tuitionRange:
      profileRow?.tuition_summary ?? fallbackUniversity.tuitionRange,
    heroSummary: profileRow?.hero_summary ?? fallbackUniversity.heroSummary,
    overview: profileRow?.overview ?? fallbackUniversity.overview,
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

  const classificationCodes = classificationRows.map(
    (classification) => classification.code,
  );

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

  return (
    <UniversityDetailPreview
      university={{
        ...university,
        admissions,
        scholarships,
      }}
      rankings={rankingViews}
      classifications={classificationCodes}
    />
  );
}

function toFallbackUniversityPreview(databaseUniversity: {
  slug: string | null;
  englishName: string | null;
  chineseName: string;
  city: string | null;
  region: string;
  establishedYear: number | null;
  website: string | null;
}): UniversityPreview {
  return {
    slug: databaseUniversity.slug ?? "university",
    englishName: databaseUniversity.englishName ?? databaseUniversity.chineseName,
    chineseName: databaseUniversity.chineseName,
    city: databaseUniversity.city ?? "Unknown",
    region: databaseUniversity.region,
    establishedYear: databaseUniversity.establishedYear ?? 0,
    website: databaseUniversity.website ?? "#",
    tuitionRange: "To be announced",
    heroSummary: "Official detail content is being added.",
    overview: "This university page is being upgraded from preview content to official database-backed details.",
    cityPitch: "",
    campusHighlights: [],
    tags: [],
    rankings: [],
    quickFacts: [
      { label: "Type", value: "University" },
      { label: "Data status", value: "Database-backed detail page in progress" },
    ],
    admissions: [],
    scholarships: [],
    studentLife: [],
  };
}

function mapAdmissionsPanels(
  tracks: Array<typeof university_admission_tracks.$inferSelect>,
  events: Array<typeof university_admission_events.$inferSelect>,
  documents: Array<typeof university_admission_documents.$inferSelect>,
): AdmissionsPanel[] {
  const eventsByTrack = new Map<string, Array<typeof events[number]>>();
  const documentsByTrack = new Map<string, Array<typeof documents[number]>>();

  for (const event of events) {
    const current = eventsByTrack.get(event.admission_track_id) ?? [];
    current.push(event);
    eventsByTrack.set(event.admission_track_id, current);
  }

  for (const document of documents) {
    const current = documentsByTrack.get(document.admission_track_id) ?? [];
    current.push(document);
    documentsByTrack.set(document.admission_track_id, current);
  }

  return tracks.flatMap((track) => {
    const degree = mapDegreeLevel(track.degree_level);
    const language = mapTeachingLanguage(track.teaching_language);

    if (!degree || !language) {
      return [];
    }

    const trackEvents = eventsByTrack.get(track.id) ?? [];
    const applicationEvents = trackEvents.filter(
      (event) => event.event_type === "application_window",
    );
    const deadlines = applicationEvents
      .map((event) => {
        if (event.starts_at && event.ends_at) {
          return `${formatDate(event.starts_at)} to ${formatDate(event.ends_at)}`;
        }

        return event.date_note ?? event.label;
      })
      .filter(Boolean);

    const supportingNotes = trackEvents
      .filter((event) => event.event_type !== "application_window")
      .map((event) => event.date_note ?? event.label)
      .filter(Boolean)
      .join(" ");

    return [
      {
        degree,
        language,
        tuition: track.tuition_text ?? "To be announced",
        duration: track.study_duration_text ?? "To be announced",
        intake: track.intake_text ?? "To be announced",
        deadline:
          deadlines.length > 0 ? deadlines.join(" / ") : "To be announced",
        languageRequirement:
          track.language_requirement_text ?? "See official requirements",
        academicRequirement:
          track.academic_requirement_text ?? "See official requirements",
        requiredDocuments: (documentsByTrack.get(track.id) ?? []).map(
          (document) => document.label,
        ),
        scholarship:
          track.scholarship_notes ?? "See scholarship section below.",
        note: [track.overview, supportingNotes].filter(Boolean).join(" "),
      },
    ];
  });
}

function mapDegreeLevel(value: string): AdmissionsPanel["degree"] | null {
  switch (value.toLowerCase()) {
    case "bachelor":
      return "Bachelor";
    case "master":
      return "Master";
    case "phd":
      return "PhD";
    default:
      return null;
  }
}

function mapTeachingLanguage(
  value: string,
): AdmissionsPanel["language"] | null {
  switch (value.toLowerCase()) {
    case "english":
    case "english-taught":
      return "English-taught";
    case "chinese":
    case "chinese-taught":
      return "Chinese-taught";
    default:
      return null;
  }
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
