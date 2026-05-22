import { asc, inArray } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import { db } from "@/lib/db";
import { classifications } from "@/lib/db/schema";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const classificationCounts = {
  C9: { en: "9 universities", zh: "9 所大学" },
  "985": { en: "39 universities", zh: "39 所大学" },
  "211": { en: "100+ universities", zh: "100+ 所大学" },
  DOUBLE_FIRST_CLASS: { en: "140+ universities", zh: "140+ 所大学" },
} as const;

const featuredUniversities = [
  {
    name: "Peking University",
    chineseName: "北京大学",
    city: "Beijing",
    cityZh: "北京",
    href: "/universities/peking-university",
    website: "https://www.pku.edu.cn",
    logo: "/peking-university.png",
  },
  {
    name: "Tsinghua University",
    chineseName: "清华大学",
    city: "Beijing",
    cityZh: "北京",
    href: "/universities/tsinghua-university",
    website: "https://www.tsinghua.edu.cn",
    logo: "/tsinghua-university.png",
  },
  {
    name: "Fudan University",
    chineseName: "复旦大学",
    city: "Shanghai",
    cityZh: "上海",
    href: "/universities/fudan-university",
    website: "https://www.fudan.edu.cn",
    logo: "/fudan-university.png",
  },
] as const;

const cities = [
  {
    name: "Beijing",
    nameZh: "北京",
    descriptionEn:
      "National capital with many of China's most prestigious universities.",
    descriptionZh: "中国首都，聚集了许多最具声望的大学。",
  },
  {
    name: "Shanghai",
    nameZh: "上海",
    descriptionEn:
      "Global city with strong universities, research, and international opportunities.",
    descriptionZh: "国际化大都市，拥有强势高校、科研资源和丰富机会。",
  },
  {
    name: "Nanjing",
    nameZh: "南京",
    descriptionEn:
      "Historic academic center with a long tradition of higher education.",
    descriptionZh: "历史悠久的学术中心，拥有深厚的高等教育传统。",
  },
  {
    name: "Hangzhou",
    nameZh: "杭州",
    descriptionEn:
      "A fast-growing innovation hub and home to Zhejiang University.",
    descriptionZh: "快速发展的创新城市，也是浙江大学所在地。",
  },
  {
    name: "Xi'an",
    nameZh: "西安",
    descriptionEn:
      "A major western-city education center with strong engineering schools.",
    descriptionZh: "中国西部重要教育中心，工程类高校实力突出。",
  },
  {
    name: "Harbin",
    nameZh: "哈尔滨",
    descriptionEn:
      "Known for technical education and top engineering institutions.",
    descriptionZh: "以工科教育和顶尖工程院校闻名。",
  },
] as const;

type Props = {
  dictionary: AppDictionary;
  locale: Locale;
};

export default async function HomePage({ dictionary, locale }: Props) {
  await connection();

  const classificationRows = await db
    .select({
      code: classifications.code,
      name: locale === "zh" ? classifications.name_zh : classifications.name_en,
      fullName:
        locale === "zh"
          ? classifications.full_name_zh
          : classifications.full_name_en,
      description:
        locale === "zh"
          ? classifications.description_zh
          : classifications.description_en,
      sortOrder: classifications.sort_order,
    })
    .from(classifications)
    .where(
      inArray(classifications.code, [
        "C9",
        "985",
        "211",
        "DOUBLE_FIRST_CLASS",
      ]),
    )
    .orderBy(asc(classifications.sort_order));

  return (
    <main className="flex-1 bg-background">
      <section className="border-b bg-linear-to-br from-background via-muted/30 to-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              {dictionary.home.badge}
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {dictionary.home.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {dictionary.home.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={localizeHref(locale, "/universities")}>
                  {dictionary.home.browseUniversities}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={localizeHref(locale, "/universities")}>
                  {dictionary.home.exploreC9}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {dictionary.home.groupsTitle}
          </h2>
          <p className="text-muted-foreground leading-7">
            {dictionary.home.groupsDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {classificationRows.map((group) => (
            <Card key={group.code} className="border-border/70">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="w-fit">
                  {classificationCounts[
                    group.code as keyof typeof classificationCounts
                  ]?.[locale] ?? group.code}
                </Badge>
                <div className="space-y-2">
                  <CardTitle>{group.name}</CardTitle>
                  {group.fullName ? (
                    <p className="text-sm font-medium text-foreground/70">
                      {group.fullName}
                    </p>
                  ) : null}
                  <CardDescription>{group.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={localizeHref(locale, "/universities")}>
                    {dictionary.home.viewGroup}
                  </Link>
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
              {dictionary.home.featuredTitle}
            </h2>
            <p className="text-muted-foreground leading-7">
              {dictionary.home.featuredDescription}
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
                    {locale === "zh" ? (
                      <>
                        <CardTitle className="text-lg">
                          {university.chineseName}
                        </CardTitle>
                        <CardDescription className="text-base text-foreground/80">
                          {university.name}
                        </CardDescription>
                      </>
                    ) : (
                      <>
                        <CardTitle className="text-lg">{university.name}</CardTitle>
                        <CardDescription className="text-base text-foreground/80">
                          {university.chineseName}
                        </CardDescription>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {dictionary.home.cityLabel}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {locale === "zh" ? university.cityZh : university.city}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dictionary.home.officialSite}
                      </a>
                    </Button>
                    <Button asChild className="sm:flex-1">
                      <Link href={localizeHref(locale, university.href)}>
                        {dictionary.home.viewDetails}
                      </Link>
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
            {dictionary.home.citiesTitle}
          </h2>
          <p className="text-muted-foreground leading-7">
            {dictionary.home.citiesDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cities.map((city) => (
            <Card key={city.name} className="border-border/70 shadow-none">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">
                  {locale === "zh" ? city.nameZh : city.name}
                </CardTitle>
                <CardDescription>
                  {locale === "zh" ? city.descriptionZh : city.descriptionEn}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
