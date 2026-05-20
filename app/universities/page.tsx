import { asc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  classifications,
  universities,
  university_classifications,
} from "@/lib/db/schema";

function getUniversityLogoPath(slug: string | null) {
  return slug ? `/${slug}.png` : "/chinese-universities-logo.png";
}

export default async function UniversitiesPage() {
  await connection();

  const c9Universities = await db
    .select({
      id: universities.id,
      chineseName: universities.name,
      name: universities.name_en,
      city: universities.city,
      slug: universities.slug,
      website: universities.website,
    })
    .from(universities)
    .innerJoin(
      university_classifications,
      eq(university_classifications.university_id, universities.id),
    )
    .innerJoin(
      classifications,
      eq(classifications.id, university_classifications.classification_id),
    )
    .where(eq(classifications.code, "C9"))
    .orderBy(asc(universities.name_en));

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            China Universities
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            C9 Universities of China
          </h1>
          <p className="text-muted-foreground text-base leading-7 sm:text-lg">
            The C9 League is often described as China&apos;s equivalent of the
            Ivy League. It brings together nine elite research universities and
            is a strong starting point for exploring top universities in China.
          </p>
        </div>

        <Card>
          <CardHeader className="gap-4 border-b">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">C9 League Members</CardTitle>
                <CardDescription>
                  Nine universities commonly grouped as the most prestigious
                  public research institutions in China.
                </CardDescription>
              </div>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                {c9Universities.length} universities
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-3">
            {c9Universities.map((university, index) => {
              const displayName = university.name ?? university.chineseName;

              return (
                <Card key={university.id} className="bg-muted/30 shadow-none">
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
                    <p className="text-muted-foreground text-sm font-medium">
                      City
                    </p>
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
                        <Button
                          variant="outline"
                          className="sm:flex-1"
                          disabled
                        >
                          Official Site
                        </Button>
                      )}
                      {university.slug ? (
                        <Button asChild className="sm:flex-1">
                          <Link href={`/universities/${university.slug}`}>
                            View Details
                          </Link>
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
            })}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
