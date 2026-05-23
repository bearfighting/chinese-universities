import { connection } from "next/server";

import UniversityDetailPageContent from "@/components/university/university-detail-page-content";
import { universityPreviewData } from "@/lib/university-preview-data";
import { getUniversityDetailPageData } from "@/lib/universities/get-university-detail-page-data";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return universityPreviewData.map((university) => ({
    slug: university.slug,
  }));
}

export default async function UniversityDetailPage(
  props: PageProps<"/universities/[slug]">,
) {
  await connection();

  const { slug } = await props.params;
  const data = await getUniversityDetailPageData(slug);

  return <UniversityDetailPageContent {...data} />;
}
