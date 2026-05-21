import FeaturePlaceholderPage from "@/components/site/feature-placeholder-page";

export default function LocationsPage() {
  return (
    <FeaturePlaceholderPage
      eyebrow="Locations"
      title="Explore universities by province and city"
      description="This page can become the location-first entrypoint for students who care about lifestyle, climate, cost of living, and regional opportunities before selecting a school."
      bullets={[
        "Browse provinces and major student cities in China.",
        "Compare universities within the same location.",
        "Layer in city guides, cost, and climate information later.",
      ]}
    />
  );
}
