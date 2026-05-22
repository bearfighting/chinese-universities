import { Badge } from "@/components/ui/badge";
import type { AppDictionary } from "@/lib/i18n/dictionaries";

type Props = {
  dictionary: AppDictionary;
};

export default function UniversitiesHero({ dictionary }: Props) {
  return (
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
  );
}
