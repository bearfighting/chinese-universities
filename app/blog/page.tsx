import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function BlogPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Blog"
      title="Publish stories, updates, and life-in-China articles"
      description="A blog is a strong addition here because it gives you a home for timely content, student experiences, application reflections, and practical living advice that do not fit neatly into the directory structure."
      bullets={[
        "Share application experiences and study-abroad reflections.",
        "Post updates on policy changes, deadlines, and university news.",
        "Write lifestyle articles about cities, dorms, classes, and daily life.",
      ]}
    />
  );
}
