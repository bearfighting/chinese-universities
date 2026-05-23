import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import type { HomeClassificationGroup } from "@/lib/home/get-home-page-data";

type Props = {
  dictionary: AppDictionary;
  groups: HomeClassificationGroup[];
  locale: Locale;
};

export default function HomeClassificationSection({
  dictionary,
  groups,
  locale,
}: Props) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
      <div className="max-w-2xl space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {dictionary.home.groupsTitle}
        </h2>
        <p className="text-muted-foreground leading-7">
          {dictionary.home.groupsDescription}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.code} className="border-border/70">
            <CardHeader className="space-y-3">
              <Badge variant="outline" className="w-fit">
                {group.universityCount} {dictionary.universities.universitiesCount}
              </Badge>
              <div className="space-y-2">
                <CardTitle>{group.name}</CardTitle>
                {group.fullName ? (
                  <p className="text-sm font-medium text-foreground/70">
                    {group.fullName}
                  </p>
                ) : null}
                <CardDescription>{group.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={localizeHref(locale, "/universities")}>
                  {dictionary.home.viewGroup}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
