import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import type { UniversityRankingView } from "@/lib/university-rankings";

export type UniversityListItem = {
  id: string;
  chineseName: string;
  name: string | null;
  city: string | null;
  slug: string | null;
  website: string | null;
  primaryRanking?: UniversityRankingView | null;
};

const rankingLabelZhMap: Record<string, string> = {
  "Global Ranking": "国际排名",
  "World University Ranking": "世界大学排名",
  "Academic Ranking of World Universities": "世界大学学术排名",
  "U.S. News Global Ranking": "U.S. News 全球排名",
  Ranking: "排名",
};

function getUniversityLogoPath(slug: string | null) {
  return slug ? `/${slug}.png` : "/chinese-universities-logo.png";
}

type Props = {
  dictionary: AppDictionary;
  university: UniversityListItem;
  index: number;
  locale: Locale;
};

export default function UniversityListCard({
  dictionary,
  university,
  index,
  locale,
}: Props) {
  const englishName = university.name ?? university.chineseName;
  const primaryName = locale === "zh" ? university.chineseName : englishName;
  const secondaryName = locale === "zh" ? englishName : university.chineseName;
  const rankingLabel =
    locale === "zh"
      ? (rankingLabelZhMap[university.primaryRanking?.label ?? ""] ??
        university.primaryRanking?.label)
      : university.primaryRanking?.label;

  return (
    <Card className="bg-muted/30 shadow-none">
      <CardHeader className="gap-3">
        <div className="flex h-24 items-center justify-center rounded-2xl border bg-background/80 p-4">
          <Image
            src={getUniversityLogoPath(university.slug)}
            alt={`${englishName} logo`}
            width={180}
            height={80}
            className="h-14 w-auto object-contain"
          />
        </div>
        <Badge variant="outline" className="w-fit">
          {String(index + 1).padStart(2, "0")}
        </Badge>
        <div className="space-y-1">
          <CardTitle className="text-lg">{primaryName}</CardTitle>
          {secondaryName ? (
            <CardDescription className="text-base text-foreground/80">
              {secondaryName}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        {university.primaryRanking ? (
          <div className="mb-4 rounded-2xl border bg-background px-4 py-3">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
              {university.primaryRanking.system} {university.primaryRanking.year}
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                {rankingLabel}
              </p>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {university.primaryRanking.rank}
              </p>
            </div>
          </div>
        ) : null}

        <p className="text-muted-foreground text-sm font-medium">
          {dictionary.universities.cityLabel}
        </p>
        <p className="mt-1 text-sm text-foreground">
          {university.city ?? dictionary.universities.unknownCity}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {university.website ? (
            <Button asChild variant="outline" className="sm:flex-1">
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary.universities.officialSite}
              </a>
            </Button>
          ) : (
            <Button variant="outline" className="sm:flex-1" disabled>
              {dictionary.universities.officialSite}
            </Button>
          )}

          {university.slug ? (
            <Button asChild className="sm:flex-1">
              <Link href={localizeHref(locale, `/universities/${university.slug}`)}>
                {dictionary.universities.viewDetails}
              </Link>
            </Button>
          ) : (
            <Button className="sm:flex-1" disabled>
              {dictionary.universities.viewDetails}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
