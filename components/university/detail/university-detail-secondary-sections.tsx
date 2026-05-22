"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UniversityPreview } from "@/lib/university-preview-data";

type Props = {
  university: UniversityPreview;
};

export default function UniversityDetailSecondarySections({
  university,
}: Props) {
  const hasRealScholarshipData = university.scholarships.length > 0;
  const scholarshipTitle = hasRealScholarshipData
    ? "Scholarships for international applicants"
    : "Funding should be visible, not buried";
  const scholarshipDescription = hasRealScholarshipData
    ? "These scholarship options are pulled from the current admissions data available for this university."
    : "Even before the data is real, showing the layout helps us test whether the page feels actionable.";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
        <CardHeader className="gap-3">
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
            Scholarships
          </Badge>
          <CardTitle>{scholarshipTitle}</CardTitle>
          <CardDescription>{scholarshipDescription}</CardDescription>
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
            Student Life
          </Badge>
          <CardTitle>The page should help users imagine living there</CardTitle>
          <CardDescription>
            This section gives emotional depth so the page is not only a
            database dump.
          </CardDescription>
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
