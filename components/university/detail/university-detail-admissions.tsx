"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  AdmissionsPanel,
  DegreeLevel,
  TeachingLanguage,
} from "@/lib/university-preview-data";

type Props = {
  admissions: AdmissionsPanel[];
  selectedDegree: DegreeLevel;
  selectedLanguage: TeachingLanguage;
  availableDegrees: DegreeLevel[];
  availableLanguages: TeachingLanguage[];
  onSelectDegree: (degree: DegreeLevel) => void;
  onSelectLanguage: (language: TeachingLanguage) => void;
};

export default function UniversityDetailAdmissions({
  admissions,
  selectedDegree,
  selectedLanguage,
  availableDegrees,
  availableLanguages,
  onSelectDegree,
  onSelectLanguage,
}: Props) {
  const currentAdmissions = admissions.find(
    (item) =>
      item.degree === selectedDegree && item.language === selectedLanguage,
  );
  const shouldShowDegreeSelector = availableDegrees.length > 1;
  const shouldShowLanguageSelector = availableLanguages.length > 1;
  const currentPathLabel = currentAdmissions
    ? shouldShowLanguageSelector ||
      currentAdmissions.language !== "Chinese-taught"
      ? `${currentAdmissions.degree} / ${currentAdmissions.language}`
      : currentAdmissions.degree
    : null;
  const hasRealAdmissionsData = admissions.length > 0;
  const admissionsTitle = hasRealAdmissionsData
    ? "Admissions requirements and application path"
    : "Degree and language tabs preview";
  const admissionsDescription = hasRealAdmissionsData
    ? "Switch between the available degree and language combinations to view deadlines, requirements, and document lists from the current admissions dataset."
    : "This is a static mock, but the interaction model is real. It is a good way to test readability before wiring the database.";

  return (
    <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
      <CardHeader className="gap-4 border-b">
        <div className="space-y-2">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            Admissions Requirements
          </Badge>
          <CardTitle className="text-2xl">{admissionsTitle}</CardTitle>
          <CardDescription>{admissionsDescription}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8 pt-6">
        {shouldShowDegreeSelector || shouldShowLanguageSelector ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {shouldShowDegreeSelector ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Degree level
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableDegrees.map((level) => {
                    const active = level === selectedDegree;

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => onSelectDegree(level)}
                        className={[
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:bg-muted",
                        ].join(" ")}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {shouldShowLanguageSelector ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Teaching language
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableLanguages.map((language) => {
                    const active = language === selectedLanguage;

                    return (
                      <button
                        key={language}
                        type="button"
                        onClick={() => onSelectLanguage(language)}
                        className={[
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          active
                            ? "border-amber-500 bg-amber-500 text-slate-950"
                            : "border-border bg-background hover:bg-muted",
                        ].join(" ")}
                      >
                        {language}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {currentAdmissions ? (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoPanel label="Tuition" value={currentAdmissions.tuition} />
              <InfoPanel
                label="Program duration"
                value={currentAdmissions.duration}
              />
              <InfoPanel label="Intake" value={currentAdmissions.intake} />
              <InfoPanel
                label="Application deadline"
                value={currentAdmissions.deadline}
              />
              <InfoPanel
                label="Language requirement"
                value={currentAdmissions.languageRequirement}
              />
              <InfoPanel
                label="Academic requirement"
                value={currentAdmissions.academicRequirement}
              />
            </div>

            <div className="rounded-[2rem] border bg-muted/30 p-6">
              {currentPathLabel ? (
                <div className="mb-5 rounded-3xl border bg-background px-4 py-4 transition-colors duration-200 hover:bg-muted/40">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                    Current path
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                    {currentPathLabel}
                  </p>
                </div>
              ) : null}
              <p className="text-sm font-medium text-foreground">
                Required documents
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {currentAdmissions.requiredDocuments.map((doc) => (
                  <div
                    key={doc}
                    className="rounded-2xl border bg-background px-4 py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                  >
                    {doc}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl border bg-muted/25 p-5 text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45">
                <p className="text-sm font-medium text-foreground">
                  Scholarship angle
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {currentAdmissions.scholarship}
                </p>
              </div>
              <p className="text-muted-foreground mt-4 rounded-2xl px-1 py-1 text-sm leading-6 transition-colors duration-200 hover:bg-muted/35">
                {currentAdmissions.note}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function InfoPanel({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[2rem] border border-border bg-muted/30 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/55">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
        {label}
      </p>
      <p className="mt-3 text-sm font-medium leading-6">{value}</p>
    </div>
  );
}
