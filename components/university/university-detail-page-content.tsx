import UniversityDetailPreview from "@/components/university/university-detail-preview";
import type { UniversityDetailPageData } from "@/lib/universities/get-university-detail-page-data";

type Props = UniversityDetailPageData;

export default function UniversityDetailPageContent({
  university,
  rankings,
  classifications,
}: Props) {
  return (
    <UniversityDetailPreview
      university={university}
      rankings={rankings}
      classifications={classifications}
    />
  );
}
