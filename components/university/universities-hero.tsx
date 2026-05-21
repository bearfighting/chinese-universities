import { Badge } from "@/components/ui/badge";

export default function UniversitiesHero() {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
        China Universities
      </Badge>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        C9 Universities of China
      </h1>
      <p className="text-muted-foreground text-base leading-7 sm:text-lg">
        The C9 League is often described as China&apos;s equivalent of the Ivy
        League. It brings together nine elite research universities and is a
        strong starting point for exploring top universities in China.
      </p>
    </div>
  );
}
