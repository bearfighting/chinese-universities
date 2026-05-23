import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import type { HomeFeaturedUniversity } from "@/lib/home/get-home-page-data";

function getUniversityLogoPath(slug: string | null) {
  return slug ? `/${slug}.png` : "/chinese-universities-logo.png";
}

type Props = {
  dictionary: AppDictionary;
  locale: Locale;
  universities: HomeFeaturedUniversity[];
};

export default function HomeFeaturedSection({
  dictionary,
  locale,
  universities,
}: Props) {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {dictionary.home.featuredTitle}
          </h2>
          <p className="text-muted-foreground leading-7">
            {dictionary.home.featuredDescription}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {universities.map((university) => {
            const englishName = university.name ?? university.chineseName;
            const primaryName =
              locale === "zh" ? university.chineseName : englishName;
            const secondaryName =
              locale === "zh" ? englishName : university.chineseName;

            return (
              <Card
                key={university.id}
                className="group overflow-hidden border-border/70 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)]"
              >
                <CardHeader className="gap-4">
                  <div className="flex h-24 items-center justify-center rounded-2xl border bg-muted/30 p-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-slate-300 group-hover:bg-muted/45">
                    <Image
                      src={getUniversityLogoPath(university.slug)}
                      alt={`${englishName} logo`}
                      width={180}
                      height={80}
                      className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg transition-colors duration-300 group-hover:text-slate-900">
                      {primaryName}
                    </CardTitle>
                    {secondaryName ? (
                      <CardDescription className="text-base text-foreground/80 transition-colors duration-300 group-hover:text-foreground/90">
                        {secondaryName}
                      </CardDescription>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {university.primaryRanking ? (
                    <div className="rounded-2xl border bg-muted/20 px-4 py-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:bg-slate-50">
                      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                        {university.primaryRanking.system}{" "}
                        {university.primaryRanking.year}
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <p className="text-sm font-medium text-foreground">
                          {university.primaryRanking.label}
                        </p>
                        <p className="text-lg font-semibold tracking-tight text-foreground">
                          {university.primaryRanking.rank}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {dictionary.home.cityLabel}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {university.city ?? dictionary.universities.unknownCity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {university.website ? (
                      <Button asChild variant="outline" className="sm:flex-1">
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {dictionary.home.officialSite}
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="sm:flex-1" disabled>
                        {dictionary.home.officialSite}
                      </Button>
                    )}
                    {university.slug ? (
                      <Button asChild className="sm:flex-1">
                        <Link
                          href={localizeHref(
                            locale,
                            `/universities/${university.slug}`,
                          )}
                        >
                          {dictionary.home.viewDetails}
                        </Link>
                      </Button>
                    ) : (
                      <Button className="sm:flex-1" disabled>
                        {dictionary.home.viewDetails}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
