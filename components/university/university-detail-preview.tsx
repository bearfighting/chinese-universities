"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

function getUniversityLogoPath(slug: string) {
  return `/${slug}.png`;
}

const universityHeroImages: Record<string, string> = {
  "peking-university": "/university-views/peking-university.jpg",
  "tsinghua-university": "/university-views/tsinghua-university.png",
  "fudan-university": "/university-views/fudan-university.jpg",
  "shanghai-jiao-tong-university":
    "/university-views/shanghai-jiao-tong-university.jpeg",
  "zhejiang-university": "/university-views/zhejiang-university.jpg",
  ustc: "/university-views/ustc.jpg",
  "nanjing-university": "/university-views/nanjing-university.jpg",
  "harbin-institute-of-technology":
    "/university-views/harbin-institute-of-technology.webp",
  "xian-jiaotong-university": "/university-views/xian-jiaotong-university.webp",
};

function getUniversityHeroImagePath(slug: string) {
  return universityHeroImages[slug] ?? null;
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
  const initialAdmissions = university.admissions[0];
  const availableDegrees = [
    ...new Set(university.admissions.map((item) => item.degree)),
  ] as DegreeLevel[];
  const [selectedDegree, setSelectedDegree] = useState<DegreeLevel>(
    initialAdmissions?.degree ?? "Master",
  );
  const availableLanguages = [
    ...new Set(
      university.admissions
        .filter((item) => item.degree === selectedDegree)
        .map((item) => item.language),
    ),
  ] as TeachingLanguage[];
  const [selectedLanguage, setSelectedLanguage] = useState<TeachingLanguage>(
    initialAdmissions?.language ?? "English-taught",
  );
  const heroImagePath = getUniversityHeroImagePath(university.slug);

  useEffect(() => {
    if (availableDegrees.length === 0) {
      return;
    }

    if (!availableDegrees.includes(selectedDegree)) {
      setSelectedDegree(availableDegrees[0]);
    }
  }, [availableDegrees, selectedDegree]);

  useEffect(() => {
    if (availableLanguages.length === 0) {
      return;
    }

    if (!availableLanguages.includes(selectedLanguage)) {
      setSelectedLanguage(availableLanguages[0]);
    }
  }, [availableLanguages, selectedLanguage]);

  const currentAdmissions = university.admissions.find(
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
  const hasRealAdmissionsData = university.admissions.length > 0;
  const hasRealScholarshipData = university.scholarships.length > 0;
  const admissionsTitle = hasRealAdmissionsData
    ? "Admissions requirements and application path"
    : "Degree and language tabs preview";
  const admissionsDescription = hasRealAdmissionsData
    ? "Switch between the available degree and language combinations to view deadlines, requirements, and document lists from the current admissions dataset."
    : "This is a static mock, but the interaction model is real. It is a good way to test readability before wiring the database.";
  const scholarshipTitle = hasRealScholarshipData
    ? "Scholarships for international applicants"
    : "Funding should be visible, not buried";
  const scholarshipDescription = hasRealScholarshipData
    ? "These scholarship options are pulled from the current admissions data available for this university."
    : "Even before the data is real, showing the layout helps us test whether the page feels actionable.";

  return (
    <main className="flex-1 bg-background">
      <section className="relative overflow-hidden border-b bg-[linear-gradient(135deg,rgba(17,24,39,0.98),rgba(31,41,55,0.94)_45%,rgba(120,53,15,0.86))] text-white">
        {heroImagePath ? (
          <div className="absolute inset-0">
            <Image
              src={heroImagePath}
              alt={`${university.englishName} campus view`}
              fill
              priority
              className="object-cover opacity-26"
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.18),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.92),rgba(15,23,42,0.78)_42%,rgba(30,41,59,0.72)_62%,rgba(120,53,15,0.78))]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex size-18 shrink-0 items-center justify-center rounded-3xl border border-white/12 bg-white/92 p-3 shadow-lg shadow-black/10">
                  <Image
                    src={getUniversityLogoPath(university.slug)}
                    alt={`${university.englishName} logo`}
                    width={96}
                    height={96}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    University Preview
                  </p>
                  <p className="text-sm text-white/72">
                    A richer hero with campus imagery and real ranking data
                  </p>
                </div>
              </div>

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

            <div className="w-full max-w-md space-y-4">
              <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 shadow-2xl backdrop-blur-sm">
                {heroImagePath ? (
                  <div className="relative h-64">
                    <Image
                      src={heroImagePath}
                      alt={`${university.englishName} campus view`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.12)_60%,rgba(15,23,42,0.68))]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <p className="text-sm font-medium text-white/70">
                          Campus view
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {university.city}
                        </p>
                      </div>
                      <Badge className="rounded-full border-white/12 bg-white/12 text-white">
                        {classifications[0] ?? "Featured"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
                    <Image
                      src={getUniversityLogoPath(university.slug)}
                      alt={`${university.englishName} logo`}
                      width={240}
                      height={120}
                      className="h-20 w-auto object-contain opacity-95"
                    />
                  </div>
                )}
              </div>

              <Card className="border-white/10 bg-white/6 text-white shadow-2xl backdrop-blur-sm">
                <CardHeader className="gap-2">
                  <CardTitle className="text-white">Ranking Snapshot</CardTitle>
                  <CardDescription className="text-white/70">
                    A compact version of the top-of-page summary card you can
                    reuse across all schools.
                  </CardDescription>
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
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
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
                <div className="rounded-3xl border bg-muted/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/60">
                  <p className="text-sm font-medium text-foreground">
                    City advantage
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {university.cityPitch}
                  </p>
                </div>
                <div className="rounded-3xl border bg-muted/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/60">
                  <p className="text-sm font-medium text-foreground">
                    Campus highlights
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {university.campusHighlights.map((item) => (
                      <p
                        key={item}
                        className="text-muted-foreground rounded-2xl px-2 py-1 text-sm leading-6 transition-colors duration-200 hover:bg-background"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <CardHeader>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                Quick facts
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-3">
              {university.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-3xl border bg-muted/25 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45"
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
                ) : null}
              </div>
            ) : null}

            {currentAdmissions ? (
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoPanel
                    label="Tuition"
                    value={currentAdmissions.tuition}
                    tone="light"
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
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
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

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                Scholarships
              </Badge>
              <CardTitle>{scholarshipTitle}</CardTitle>
              <CardDescription>
                {scholarshipDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {university.scholarships.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border bg-muted/25 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
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
                <div
                  key={item.title}
                  className="rounded-3xl border bg-muted/25 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45"
                >
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
    <div className="rounded-3xl border border-white/10 bg-white/6 px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10">
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
  tone?: "light";
}) {
  return (
    <div
      className={[
        "rounded-[2rem] border p-5 transition-all duration-200 hover:-translate-y-0.5",
        "border-border bg-muted/30 hover:border-slate-300 hover:bg-muted/55",
      ].join(" ")}
    >
      <p
        className={[
          "text-xs uppercase tracking-[0.2em]",
          "text-muted-foreground",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="mt-3 text-sm font-medium leading-6">{value}</p>
    </div>
  );
}
