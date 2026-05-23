import { connection } from "next/server";

import HomeCitiesSection from "@/components/site/home/home-cities-section";
import HomeClassificationSection from "@/components/site/home/home-classification-section";
import HomeFeaturedSection from "@/components/site/home/home-featured-section";
import HomeHeroSection from "@/components/site/home/home-hero-section";
import type { Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import { getHomePageData } from "@/lib/home/get-home-page-data";

type Props = {
  dictionary: AppDictionary;
  locale: Locale;
};

export default async function HomePage({ dictionary, locale }: Props) {
  await connection();

  const data = await getHomePageData(locale);

  return (
    <main className="flex-1 bg-background">
      <HomeHeroSection dictionary={dictionary} locale={locale} />
      <HomeClassificationSection
        dictionary={dictionary}
        groups={data.classificationGroups}
        locale={locale}
      />
      <HomeFeaturedSection
        dictionary={dictionary}
        locale={locale}
        universities={data.featuredUniversities}
      />
      <HomeCitiesSection
        cities={data.cities}
        dictionary={dictionary}
        locale={locale}
      />
    </main>
  );
}
