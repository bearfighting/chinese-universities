"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UniversityPreview } from "@/lib/university-preview-data";
import type { UniversityRankingView } from "@/lib/university-rankings";

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

function getUniversityLogoPath(slug: string) {
  return `/${slug}.png`;
}

function getUniversityHeroImagePath(slug: string) {
  return universityHeroImages[slug] ?? null;
}

type Props = {
  university: UniversityPreview;
  rankings: UniversityRankingView[];
  classifications: string[];
};

export default function UniversityDetailHero({
  university,
  rankings,
  classifications,
}: Props) {
  const heroImagePath = getUniversityHeroImagePath(university.slug);

  return (
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
              <HeroFact label="Tuition range" value={university.tuitionRange} />
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
