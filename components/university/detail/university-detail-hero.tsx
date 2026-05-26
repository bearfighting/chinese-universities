"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getLocaleFromPathname } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
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
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getDictionary(locale).universityDetail.hero;
  const heroImagePath = getUniversityHeroImagePath(university.slug);
  const motto = locale === "zh" ? university.mottoZh : university.mottoEn;
  const displayName =
    locale === "zh" ? university.chineseName : university.englishName;
  const rankingTitle = locale === "zh" ? "\u6392\u540d" : "Ranking";
  const strengthsTitle = locale === "zh" ? "\u4f18\u52bf" : "Strengths";
  const environmentTitle = locale === "zh" ? "\u6c1b\u56f4" : "Environment";
  const bestFitTitle = locale === "zh" ? "\u9002\u5408\u8c01" : "Best For";

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_52%,#f8fafc_100%)] text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_24%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.05),transparent_34%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex size-18 shrink-0 items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-3 shadow-lg shadow-slate-900/5">
                <Image
                  src={getUniversityLogoPath(university.slug)}
                  alt={`${university.englishName} logo`}
                  width={96}
                  height={96}
                  className="h-12 w-auto object-contain"
                />
              </div>
              {motto ? (
                <div className="space-y-1">
                  <p
                    className={
                      locale === "zh"
                        ? "text-sm font-medium tracking-[0.08em] text-slate-700"
                        : "text-sm italic text-slate-500"
                    }
                  >
                    {motto}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {classifications.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full border-slate-200 bg-white/90 px-3 py-1 text-slate-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {displayName}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {university.heroSummary}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <HeroFact label={copy.city} value={university.city} />
              <HeroFact label={copy.region} value={university.region} />
              <HeroFact label={copy.tuitionRange} value={university.tuitionRange} />
              <HeroFact
                label={copy.founded}
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
                  {copy.officialWebsite}
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
              {heroImagePath ? (
                <div className="relative h-64">
                  <Image
                    src={heroImagePath}
                    alt={`${university.englishName} campus view`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.06)_58%,rgba(15,23,42,0.58))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-medium text-white/78">
                      {copy.campusView}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {university.city}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(241,245,249,0.92))] p-6">
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

            <Card className="border-slate-200/80 bg-white/90 text-slate-950 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm">
              <CardHeader className="gap-2">
                <CardTitle className="text-slate-950">{rankingTitle}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {rankings.map((ranking, index) => (
                  <div key={`${ranking.system}-${ranking.year}`}>
                    <div className="flex items-center gap-4 py-3">
                      <p className="min-w-0 flex-1 text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">
                          {ranking.system}
                        </span>{" "}
                        <span>{getRankingSuffixLabel(ranking)}</span>
                      </p>
                      <p className="shrink-0 text-sm font-semibold leading-none text-slate-950 tabular-nums">
                        {ranking.rank}
                      </p>
                    </div>
                    {index < rankings.length - 1 ? (
                      <div className="h-px bg-slate-200/80" />
                    ) : null}
                  </div>
                ))}
              </CardContent>
            </Card>

            <HeroTabbedCard
              bestFitItems={university.bestFit}
              bestFitTitle={bestFitTitle}
              environmentItems={university.environment}
              environmentTitle={environmentTitle}
              strengthsItems={university.strengths}
              strengthsTitle={strengthsTitle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/78 px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-950">{value}</p>
    </div>
  );
}

function HeroListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-white/6 text-white shadow-2xl backdrop-blur-sm">
      <CardHeader className="gap-2">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-black/14 px-4 py-3"
          >
            <p className="text-sm leading-6 text-white/88">{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function HeroTabbedCard({
  bestFitItems,
  bestFitTitle,
  environmentItems,
  environmentTitle,
  strengthsItems,
  strengthsTitle,
}: {
  bestFitItems: string[];
  bestFitTitle: string;
  environmentItems: string[];
  environmentTitle: string;
  strengthsItems: string[];
  strengthsTitle: string;
}) {
  const panels = [
    {
      key: "strengths" as const,
      title: strengthsTitle,
      items: strengthsItems,
      variant: "tags" as const,
    },
    {
      key: "environment" as const,
      title: environmentTitle,
      items: environmentItems,
      variant: "tags" as const,
    },
    {
      key: "bestFit" as const,
      title: bestFitTitle,
      items: bestFitItems,
      variant: "tags" as const,
    },
  ].filter((panel) => panel.items.length > 0);

  if (panels.length === 0) {
    return null;
  }

  const defaultValue = panels[0]?.key;

  return (
    <Card className="border-slate-200/80 bg-white/90 text-slate-950 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm">
      <CardContent className="pt-6">
        <Tabs defaultValue={defaultValue} className="gap-5">
          <TabsList>
            {panels.map((panel) => (
              <TabsTrigger key={panel.key} value={panel.key}>
                {panel.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {panels.map((panel) => (
            <TabsContent key={panel.key} value={panel.key}>
              <p className="text-sm leading-7 text-slate-700">
                {panel.items.map((item, index) => (
                  <span key={item}>
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="mx-2 inline-block text-slate-900"
                      >
                        •
                      </span>
                    ) : null}
                    <span>{item}</span>
                  </span>
                ))}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function getRankingSuffixLabel(ranking: UniversityRankingView) {
  if (ranking.system === "QS") {
    return "World Ranking";
  }

  if (ranking.system === "THE") {
    return "World Ranking";
  }

  return ranking.label;
}
