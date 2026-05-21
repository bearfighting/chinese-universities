import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function GuidesPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Guides"
      title="Build a practical guide library for studying in China"
      description="Guides can hold structured content such as application timelines, visa notes, language exams, and decision-making checklists that do not belong inside one university profile."
      bullets={[
        "Explain the application process step by step.",
        "Publish timelines, document checklists, and exam guidance.",
        "Support users before they are ready to choose a specific university.",
      ]}
    />
  );
}
