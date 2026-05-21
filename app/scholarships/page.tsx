import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function ScholarshipsPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Scholarships"
      title="Track scholarship options across universities"
      description="This page can later centralize Chinese Government Scholarship routes, provincial awards, and school-specific funding so students can compare affordability more directly."
      bullets={[
        "List scholarship types by university and degree level.",
        "Show eligibility notes and likely application windows.",
        "Connect funding information to each university detail page.",
      ]}
    />
  );
}
