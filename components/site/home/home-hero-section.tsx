import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";

type Props = {
  dictionary: AppDictionary;
  featuredCount: number;
  groupCount: number;
  locale: Locale;
  cityCount: number;
};

export default function HomeHeroSection({
  dictionary,
  featuredCount,
  groupCount,
  locale,
  cityCount,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.94)_48%,rgba(120,53,15,0.88))] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(15,23,42,0.72)_46%,rgba(51,65,85,0.68)_68%,rgba(120,53,15,0.74))]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-6">
          <Badge
            variant="secondary"
            className="w-fit rounded-full border-white/10 bg-white/10 px-3 py-1 text-white"
          >
            {dictionary.home.badge}
          </Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dictionary.home.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
              {dictionary.home.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/85"
            >
              <Link href={localizeHref(locale, "/universities")}>
                {dictionary.home.browseUniversities}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/18 bg-white/6 text-white hover:bg-white/12"
            >
              <Link href={localizeHref(locale, "/universities")}>
                {dictionary.home.exploreC9}
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-xl gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <HeroStatCard
            title={dictionary.home.groupsTitle}
            value={String(groupCount)}
            description={dictionary.home.groupsDescription}
          />
          <HeroStatCard
            title={dictionary.home.featuredTitle}
            value={String(featuredCount)}
            description={dictionary.home.featuredDescription}
          />
          <HeroStatCard
            title={dictionary.home.citiesTitle}
            value={String(cityCount)}
            description={dictionary.home.citiesDescription}
          />
        </div>
      </div>
    </section>
  );
}

function HeroStatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="border-white/12 bg-white/8 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/12">
      <CardHeader className="gap-2">
        <p className="text-xs uppercase tracking-[0.24em] text-white/58">
          Snapshot
        </p>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-4xl font-semibold tracking-tight text-white">
          {value}
        </p>
        <p className="text-sm leading-6 text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
}
