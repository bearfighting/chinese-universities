import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

function getUniversityLogoPath(slug: string | null) {
  return slug ? `/${slug}.png` : "/chinese-universities-logo.png";
}

type Props = {
  university: UniversityListItem;
  index: number;
};

export default function UniversityListCard({ university, index }: Props) {
  const displayName = university.name ?? university.chineseName;

  return (
    <Card className="bg-muted/30 shadow-none">
      <CardHeader className="gap-3">
        <div className="flex h-24 items-center justify-center rounded-2xl border bg-background/80 p-4">
          <Image
            src={getUniversityLogoPath(university.slug)}
            alt={`${displayName} logo`}
            width={180}
            height={80}
            className="h-14 w-auto object-contain"
          />
        </div>
        <Badge variant="outline" className="w-fit">
          {String(index + 1).padStart(2, "0")}
        </Badge>
        <div className="space-y-1">
          <CardTitle className="text-lg">{displayName}</CardTitle>
          <CardDescription className="text-base text-foreground/80">
            {university.chineseName}
          </CardDescription>
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
                {university.primaryRanking.label}
              </p>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {university.primaryRanking.rank}
              </p>
            </div>
          </div>
        ) : null}

        <p className="text-muted-foreground text-sm font-medium">City</p>
        <p className="mt-1 text-sm text-foreground">
          {university.city ?? "Unknown"}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {university.website ? (
            <Button asChild variant="outline" className="sm:flex-1">
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Site
              </a>
            </Button>
          ) : (
            <Button variant="outline" className="sm:flex-1" disabled>
              Official Site
            </Button>
          )}

          {university.slug ? (
            <Button asChild className="sm:flex-1">
              <Link href={`/universities/${university.slug}`}>View Details</Link>
            </Button>
          ) : (
            <Button className="sm:flex-1" disabled>
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
