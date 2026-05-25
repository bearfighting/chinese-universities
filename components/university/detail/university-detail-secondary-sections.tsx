"use client";

import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocaleFromPathname } from "@/lib/i18n/config";
import type { UniversityPreview } from "@/lib/university-preview-data";

type Props = {
  university: UniversityPreview;
};

export default function UniversityDetailSecondarySections({
  university,
}: Props) {
  const locale = getLocaleFromPathname(usePathname());
  const hasRealScholarshipData = university.scholarships.length > 0;
  const dictionary = getDictionary(locale).universityDetail.secondary;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
        <CardHeader className="gap-3">
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
            {dictionary.scholarshipsBadge}
          </Badge>
          <CardTitle>
            {hasRealScholarshipData
              ? dictionary.scholarshipTitleReal
              : dictionary.scholarshipTitleFallback}
          </CardTitle>
          <CardDescription>
            {hasRealScholarshipData
              ? dictionary.scholarshipDescriptionReal
              : dictionary.scholarshipDescriptionFallback}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {university.scholarships.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border bg-muted/25 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45"
            >
              <p className="font-medium">{item.title}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
        <CardHeader className="gap-3">
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
            {dictionary.studentLifeBadge}
          </Badge>
          <CardTitle>{dictionary.studentLifeTitle}</CardTitle>
          <CardDescription>{dictionary.studentLifeDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {university.studentLife.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border bg-muted/25 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45"
            >
              <p className="font-medium">{item.title}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
