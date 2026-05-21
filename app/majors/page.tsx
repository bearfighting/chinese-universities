import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function MajorsPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Majors"
      title="Find universities through academic strengths and majors"
      description="This section can grow into a subject-first browsing experience, helping students narrow schools by program availability, language, and long-term academic fit."
      bullets={[
        "Browse by major, discipline, or academic cluster.",
        "Compare which universities are strongest in each subject area.",
        "Eventually connect majors with admissions and scholarship data.",
      ]}
    />
  );
}
