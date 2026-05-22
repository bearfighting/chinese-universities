import UniversityDetailPage, {
  generateStaticParams as generateSlugParams,
} from "@/app/universities/[slug]/page";
import { locales } from "@/lib/i18n/config";

export async function generateStaticParams() {
  const slugParams = await generateSlugParams();

  return locales.flatMap((locale) =>
    slugParams.map((params) => ({
      locale,
      slug: params.slug,
    })),
  );
}

export default UniversityDetailPage;
