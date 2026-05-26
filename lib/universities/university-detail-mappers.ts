import {
  university_admission_documents,
  university_admission_events,
  university_admission_tracks,
} from "@/lib/db/schema";
import {
  type AdmissionsPanel,
  type UniversityPreview,
} from "@/lib/university-preview-data";

export function toFallbackUniversityPreview(databaseUniversity: {
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
    mottoZh: null,
    mottoEn: null,
    city: databaseUniversity.city ?? "Unknown",
    region: databaseUniversity.region,
    establishedYear: databaseUniversity.establishedYear ?? 0,
    website: databaseUniversity.website ?? "#",
    tuitionRange: "To be announced",
    heroSummary: "Official detail content is being added.",
    overview:
      "This university page is being upgraded from preview content to official database-backed details.",
    cityPitch: "",
    campusHighlights: [],
    tags: [],
    rankings: [],
    quickFacts: [
      { label: "Type", value: "University" },
      { label: "Data status", value: "Database-backed detail page in progress" },
    ],
    strengths: [],
    environment: [],
    bestFit: [],
    admissions: [],
    scholarships: [],
    studentLife: [],
  };
}

export function mapAdmissionsPanels(
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
