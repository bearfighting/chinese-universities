import { Badge } from "@/components/ui/badge";

export default function UniversitiesHero() {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
        China Universities
      </Badge>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Discover universities in China
      </h1>
      <p className="text-muted-foreground text-base leading-7 sm:text-lg">
        Explore universities through classifications, rankings, and location,
        then refine your shortlist with more academic filters as new data is
        added.
      </p>
    </div>
  );
}
