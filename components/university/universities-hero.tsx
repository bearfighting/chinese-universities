import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AppDictionary } from "@/lib/i18n/dictionaries";

type Props = {
  dictionary: AppDictionary;
};

export default function UniversitiesHero({ dictionary }: Props) {
  return (
    <div className="overflow-hidden rounded-[2rem] border bg-[linear-gradient(135deg,rgba(248,250,252,0.98),rgba(241,245,249,0.94)_56%,rgba(255,247,237,0.96))]">
      <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:px-10 lg:py-10">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {dictionary.universities.heroBadge}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {dictionary.universities.heroTitle}
          </h1>
          <p className="text-muted-foreground text-base leading-7 sm:text-lg">
            {dictionary.universities.heroDescription}
          </p>
        </div>

        <Card className="border-border/70 bg-white/80 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white">
          <CardContent className="grid gap-4 p-6">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.22em]">
                Browse mode
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Category-first discovery
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-6">
              This page is designed for scanning broad university groups first,
              then narrowing into individual schools with ranking and city cues.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
