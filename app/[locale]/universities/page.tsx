import { notFound } from "next/navigation";

import UniversitiesPageContent from "@/components/university/universities-page-content";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function LocalizedUniversitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <UniversitiesPageContent
      locale={locale}
      dictionary={getDictionary(locale)}
    />
  );
}
