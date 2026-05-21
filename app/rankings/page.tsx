import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function RankingsPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Rankings"
      title="Compare universities through major ranking systems"
      description="This section can evolve into a ranking-first discovery view for QS, THE, ARWU, and other systems, with filters by year, province, and university type."
      bullets={[
        "Browse ranking tables by system and year.",
        "Compare how the same university performs across rankings.",
        "Jump from a ranking row into a university detail page.",
      ]}
    />
  );
}
