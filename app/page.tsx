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

const universityGroups = [
  {
    name: "C9 League",
    description:
      "China's most elite research universities and a strong place to begin exploring top institutions.",
    href: "/universities",
    count: "9 universities",
  },
  {
    name: "Project 985",
    description:
      "A group of leading universities that received major national support to build world-class research capacity.",
    href: "/universities",
    count: "39 universities",
  },
  {
    name: "Project 211",
    description:
      "A wider network of key universities selected for academic development across China.",
    href: "/universities",
    count: "100+ universities",
  },
  {
    name: "Double First-Class",
    description:
      "China's current national initiative focused on building first-class universities and disciplines.",
    href: "/universities",
    count: "140+ universities",
  },
] as const;

const featuredUniversities = [
  {
    name: "Peking University",
    chineseName: "\u5317\u4eac\u5927\u5b66",
    city: "Beijing",
    href: "/universities/peking-university",
    website: "https://www.pku.edu.cn",
    logo: "/peking-university.png",
  },
  {
    name: "Tsinghua University",
    chineseName: "\u6e05\u534e\u5927\u5b66",
    city: "Beijing",
    href: "/universities/tsinghua-university",
    website: "https://www.tsinghua.edu.cn",
    logo: "/tsinghua-university.png",
  },
  {
    name: "Fudan University",
    chineseName: "\u590d\u65e6\u5927\u5b66",
    city: "Shanghai",
    href: "/universities/fudan-university",
    website: "https://www.fudan.edu.cn",
    logo: "/fudan-university.png",
  },
] as const;

const cities = [
  {
    name: "Beijing",
    description: "National capital with many of China&apos;s most prestigious universities.",
  },
  {
    name: "Shanghai",
    description: "Global city with strong universities, research, and international opportunities.",
  },
  {
    name: "Nanjing",
    description: "Historic academic center with a long tradition of higher education.",
  },
  {
    name: "Hangzhou",
    description: "A fast-growing innovation hub and home to Zhejiang University.",
  },
  {
    name: "Xi'an",
    description: "A major western-city education center with strong engineering schools.",
  },
  {
    name: "Harbin",
    description: "Known for technical education and top engineering institutions.",
  },
] as const;

export default function Home() {
  return (
    <main className="flex-1 bg-background">
      <section className="border-b bg-linear-to-br from-background via-muted/30 to-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              Study in China
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Explore top universities in China with a clear starting point.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Discover leading university groups, compare major cities, and
                start with the institutions most students research first.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/universities">Browse Universities</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/universities">Explore C9 League</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Start with key university groups
          </h2>
          <p className="text-muted-foreground leading-7">
            These categories help organize China&apos;s higher education landscape
            before you dive into individual schools.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {universityGroups.map((group) => (
            <Card key={group.name} className="border-border/70">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="w-fit">
                  {group.count}
                </Badge>
                <div className="space-y-2">
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={group.href}>View Group</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Featured universities
            </h2>
            <p className="text-muted-foreground leading-7">
              A few of the most recognized universities in China, starting with
              well-known members of the C9 League.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {featuredUniversities.map((university) => (
              <Card key={university.name} className="bg-background">
                <CardHeader className="gap-4">
                  <div className="flex h-24 items-center justify-center rounded-2xl border bg-muted/30 p-4">
                    <Image
                      src={university.logo}
                      alt={`${university.name} logo`}
                      width={180}
                      height={80}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{university.name}</CardTitle>
                    <CardDescription className="text-base text-foreground/80">
                      {university.chineseName}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      City
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {university.city}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Site
                      </a>
                    </Button>
                    <Button asChild className="sm:flex-1">
                      <Link href={university.href}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Browse by city
          </h2>
          <p className="text-muted-foreground leading-7">
            Many students choose a city first, then compare universities within
            that region.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cities.map((city) => (
            <Card key={city.name} className="border-border/70 shadow-none">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">{city.name}</CardTitle>
                <CardDescription>{city.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
