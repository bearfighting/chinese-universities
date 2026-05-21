import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function SearchPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Search"
      title="Search across universities, rankings, and future filters"
      description="Search can become the fastest entrypoint once your data model expands, especially when users want to mix classification, ranking, province, and program-level criteria."
      bullets={[
        "Search by university name in English or Chinese.",
        "Filter by rankings, province, and classification.",
        "Later extend search into majors, tuition, and admissions requirements.",
      ]}
    />
  );
}
