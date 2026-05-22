"use client";

import { useState } from "react";

import UniversityDetailAdmissions from "@/components/university/detail/university-detail-admissions";
import UniversityDetailHero from "@/components/university/detail/university-detail-hero";
import UniversityDetailOverview from "@/components/university/detail/university-detail-overview";
import UniversityDetailSecondarySections from "@/components/university/detail/university-detail-secondary-sections";
import type {
  DegreeLevel,
  TeachingLanguage,
  UniversityPreview,
} from "@/lib/university-preview-data";
import type { UniversityRankingView } from "@/lib/university-rankings";

type Props = {
  university: UniversityPreview;
  rankings: UniversityRankingView[];
  classifications: string[];
};

export default function UniversityDetailPreview({
  university,
  rankings,
  classifications,
}: Props) {
  const initialAdmissions = university.admissions[0];
  const availableDegrees = [
    ...new Set(university.admissions.map((item) => item.degree)),
  ] as DegreeLevel[];
  const [selectedDegree, setSelectedDegree] = useState<DegreeLevel>(
    initialAdmissions?.degree ?? "Master",
  );
  const effectiveSelectedDegree = availableDegrees.includes(selectedDegree)
    ? selectedDegree
    : (availableDegrees[0] ?? selectedDegree);
  const availableLanguages = [
    ...new Set(
      university.admissions
        .filter((item) => item.degree === effectiveSelectedDegree)
        .map((item) => item.language),
    ),
  ] as TeachingLanguage[];
  const [selectedLanguage, setSelectedLanguage] = useState<TeachingLanguage>(
    initialAdmissions?.language ?? "English-taught",
  );
  const effectiveSelectedLanguage = availableLanguages.includes(selectedLanguage)
    ? selectedLanguage
    : (availableLanguages[0] ?? selectedLanguage);

  return (
    <main className="flex-1 bg-background">
      <UniversityDetailHero
        university={university}
        rankings={rankings}
        classifications={classifications}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
        <UniversityDetailOverview university={university} />
        <UniversityDetailAdmissions
          admissions={university.admissions}
          selectedDegree={effectiveSelectedDegree}
          selectedLanguage={effectiveSelectedLanguage}
          availableDegrees={availableDegrees}
          availableLanguages={availableLanguages}
          onSelectDegree={setSelectedDegree}
          onSelectLanguage={setSelectedLanguage}
        />
        <UniversityDetailSecondarySections university={university} />
      </section>
    </main>
  );
}
