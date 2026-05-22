import UniversitiesPageContent from "@/components/university/universities-page-content";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function UniversitiesPage() {
  return (
    <UniversitiesPageContent
      locale={defaultLocale}
      dictionary={getDictionary(defaultLocale)}
    />
  );
}
