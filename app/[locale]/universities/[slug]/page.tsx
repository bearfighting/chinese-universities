import { connection } from "next/server";
import { notFound } from "next/navigation";

import UniversityDetailPageContent from "@/components/university/university-detail-page-content";
import { isLocale, locales } from "@/lib/i18n/config";
import { universityPreviewData } from "@/lib/university-preview-data";
import { getUniversityDetailPageData } from "@/lib/universities/get-university-detail-page-data";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    universityPreviewData.map((university) => ({
      locale,
      slug: university.slug,
    })),
  );
}

export default async function LocalizedUniversityDetailPage(
  props: PageProps<"/[locale]/universities/[slug]">,
) {
  await connection();

  const { locale, slug } = await props.params;

  if (!isLocale(locale)) {
    notFound();
  }

  const data = await getUniversityDetailPageData(slug, locale);

  return <UniversityDetailPageContent {...data} />;
}
