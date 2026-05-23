import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";

type Props = {
  dictionary: AppDictionary;
  locale: Locale;
};

export default function HomeHeroSection({ dictionary, locale }: Props) {
  return (
    <section className="border-b bg-linear-to-br from-background via-muted/30 to-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-6">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {dictionary.home.badge}
          </Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {dictionary.home.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {dictionary.home.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={localizeHref(locale, "/universities")}>
                {dictionary.home.browseUniversities}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localizeHref(locale, "/universities")}>
                {dictionary.home.exploreC9}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
