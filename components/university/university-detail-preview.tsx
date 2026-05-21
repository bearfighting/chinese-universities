"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  DegreeLevel,
  TeachingLanguage,
  UniversityPreview,
} from "@/lib/university-preview-data";
import type { UniversityRankingView } from "@/lib/university-rankings";

const degreeLevels: DegreeLevel[] = ["Bachelor", "Master", "PhD"];
const teachingLanguages: TeachingLanguage[] = [
  "English-taught",
  "Chinese-taught",
];

function getUniversityLogoPath(slug: string) {
  return `/${slug}.png`;
}

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
  const [selectedDegree, setSelectedDegree] = useState<DegreeLevel>("Master");
  const [selectedLanguage, setSelectedLanguage] =
    useState<TeachingLanguage>("English-taught");

  const currentAdmissions = university.admissions.find(
    (item) =>
      item.degree === selectedDegree && item.language === selectedLanguage,
  );

  return (
    <main className="flex-1 bg-background">
      <section className="relative overflow-hidden border-b bg-[linear-gradient(135deg,rgba(17,24,39,0.98),rgba(31,41,55,0.94)_45%,rgba(120,53,15,0.86))] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.18),transparent_28%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="flex flex-wrap gap-2">
                {classifications.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full border-white/15 bg-white/10 px-3 py-1 text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  University Preview
                </p>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {university.englishName}
                </h1>
                <p className="text-lg text-white/72">{university.chineseName}</p>
                <p className="max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
                  {university.heroSummary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <HeroFact label="City" value={university.city} />
                <HeroFact label="Region" value={university.region} />
                <HeroFact
                  label="Tuition range"
                  value={university.tuitionRange}
                />
                <HeroFact
                  label="Founded"
                  value={String(university.establishedYear)}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/85"
                >
                  <a
                    href={university.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Official Website
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/universities">Back to Universities</Link>
                </Button>
              </div>
            </div>

            <Card className="w-full max-w-md border-white/10 bg-white/6 text-white shadow-2xl backdrop-blur-sm">
              <CardHeader className="gap-4">
                <div className="flex h-24 items-center justify-center rounded-3xl border border-white/10 bg-white/95 p-4">
                  <Image
                    src={getUniversityLogoPath(university.slug)}
                    alt={`${university.englishName} logo`}
                    width={220}
                    height={88}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-white">Ranking Snapshot</CardTitle>
                  <CardDescription className="text-white/70">
                    A compact version of the top-of-page summary card you can
                    reuse across all schools.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3">
                {rankings.map((ranking) => (
                  <div
                    key={`${ranking.system}-${ranking.year}`}
                    className="rounded-3xl border border-white/10 bg-black/14 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white/70">
                          {ranking.system} {ranking.year}
                        </p>
                        <p className="mt-1 text-sm text-white/60">
                          {ranking.label}
                        </p>
                      </div>
                      <p className="text-3xl font-semibold tracking-tight">
                        {ranking.rank}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="bg-card">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                Overview
              </Badge>
              <CardTitle className="text-2xl">Why this university stands out</CardTitle>
              <CardDescription>
                This section helps the page feel editorial and useful before the
                user reaches the admissions detail.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <p className="text-muted-foreground text-base leading-7">
                {university.overview}
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl border bg-muted/40 p-5">
                  <p className="text-sm font-medium text-foreground">
                    City advantage
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {university.cityPitch}
                  </p>
                </div>
                <div className="rounded-3xl border bg-muted/40 p-5">
                  <p className="text-sm font-medium text-foreground">
                    Campus highlights
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {university.campusHighlights.map((item) => (
                      <p key={item} className="text-muted-foreground text-sm leading-6">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                Quick facts
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-3">
              {university.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-3xl border bg-muted/25 p-4"
                >
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6">
                    {fact.value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card">
          <CardHeader className="gap-4 border-b">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
                Admissions Requirements
              </Badge>
              <CardTitle className="text-2xl">
                Degree and language tabs preview
              </CardTitle>
              <CardDescription>
                This is a static mock, but the interaction model is real. It is
                a good way to test readability before wiring the database.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8 pt-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Degree level</p>
                <div className="flex flex-wrap gap-2">
                  {degreeLevels.map((level) => {
                    const active = level === selectedDegree;

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSelectedDegree(level)}
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

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Teaching language
                </p>
                <div className="flex flex-wrap gap-2">
                  {teachingLanguages.map((language) => {
                    const active = language === selectedLanguage;

                    return (
                      <button
                        key={language}
                        type="button"
                        onClick={() => setSelectedLanguage(language)}
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
            </div>

            {currentAdmissions ? (
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoPanel
                    label="Tuition"
                    value={currentAdmissions.tuition}
                    tone="dark"
                  />
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
                  <p className="text-sm font-medium text-foreground">
                    Required documents
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {currentAdmissions.requiredDocuments.map((doc) => (
                      <div
                        key={doc}
                        className="rounded-2xl border bg-background px-4 py-3 text-sm"
                      >
                        {doc}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
                    <p className="text-sm font-medium text-white/70">
                      Scholarship angle
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/88">
                      {currentAdmissions.scholarship}
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm leading-6">
                    {currentAdmissions.note}
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                Scholarships
              </Badge>
              <CardTitle>Funding should be visible, not buried</CardTitle>
              <CardDescription>
                Even before the data is real, showing the layout helps us test
                whether the page feels actionable.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {university.scholarships.map((item) => (
                <div key={item.title} className="rounded-3xl border bg-muted/25 p-5">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                Student Life
              </Badge>
              <CardTitle>The page should help users imagine living there</CardTitle>
              <CardDescription>
                This section gives emotional depth so the page is not only a
                database dump.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {university.studentLife.map((item) => (
                <div key={item.title} className="rounded-3xl border bg-muted/25 p-5">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/6 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/55">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}

function InfoPanel({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={[
        "rounded-[2rem] border p-5",
        isDark
          ? "border-slate-900 bg-slate-950 text-white"
          : "border-border bg-muted/30",
      ].join(" ")}
    >
      <p
        className={[
          "text-xs uppercase tracking-[0.2em]",
          isDark ? "text-white/60" : "text-muted-foreground",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="mt-3 text-sm font-medium leading-6">{value}</p>
    </div>
  );
}
