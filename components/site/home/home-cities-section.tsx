import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import type { HomeCity } from "@/lib/home/get-home-page-data";

type Props = {
  cities: HomeCity[];
  dictionary: AppDictionary;
  locale: Locale;
};

export default function HomeCitiesSection({
  cities,
  dictionary,
  locale,
}: Props) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-10 lg:px-12">
      <div className="max-w-2xl space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {dictionary.home.citiesTitle}
        </h2>
        <p className="text-muted-foreground leading-7">
          {dictionary.home.citiesDescription}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cities.map((city) => {
          const cityLabel = locale === "zh" ? city.cityZh ?? city.cityEn : city.cityEn;
          const featuredSchoolNames = city.featuredSchoolNames.join(", ");

          return (
            <Card
              key={`${city.cityEn}-${city.cityZh ?? ""}`}
              className="border-border/70 shadow-none"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg">{cityLabel}</CardTitle>
                  <Badge variant="outline">
                    {city.universityCount} {dictionary.universities.universitiesCount}
                  </Badge>
                </div>
                <CardDescription>
                  {featuredSchoolNames || dictionary.universities.unknownCity}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
