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

export default function UniversityDetailOverview({ university }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
        <CardHeader className="gap-3">
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
            Overview
          </Badge>
          <CardTitle className="text-2xl">Why this university stands out</CardTitle>
          <CardDescription>
            This section helps the page feel editorial and useful before the
            user reaches the admissions detail.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <p className="text-muted-foreground text-base leading-7">
            {university.overview}
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border bg-muted/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/60">
              <p className="text-sm font-medium text-foreground">
                City advantage
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {university.cityPitch}
              </p>
            </div>
            <div className="rounded-3xl border bg-muted/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/60">
              <p className="text-sm font-medium text-foreground">
                Campus highlights
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {university.campusHighlights.map((item) => (
                  <p
                    key={item}
                    className="text-muted-foreground rounded-2xl px-2 py-1 text-sm leading-6 transition-colors duration-200 hover:bg-background"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300">
        <CardHeader>
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
            Quick facts
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-3">
          {university.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-3xl border bg-muted/25 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-muted/45"
            >
              <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                {fact.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-6">{fact.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
