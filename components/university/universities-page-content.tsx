import UniversitiesHero from "@/components/university/universities-hero";
import UniversitiesListSection, {
} from "@/components/university/universities-list-section";
import type { Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import { getUniversitiesPageData } from "@/lib/universities/get-universities-page-data";

type Props = {
  locale: Locale;
  dictionary: AppDictionary;
};

export default async function UniversitiesPageContent({
  locale,
  dictionary,
}: Props) {
  const groups = await getUniversitiesPageData(locale);

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <UniversitiesHero dictionary={dictionary} />
        <UniversitiesListSection
          dictionary={dictionary}
          groups={groups}
          locale={locale}
        />
      </section>
    </main>
  );
}
