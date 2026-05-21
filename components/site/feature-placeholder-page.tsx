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

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export default function FeaturePlaceholderPage({
  eyebrow,
  title,
  description,
  bullets,
}: Props) {
  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="max-w-3xl space-y-5">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {eyebrow}
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground text-base leading-7 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        <Card className="border-border/70">
          <CardHeader className="gap-3 border-b">
            <CardTitle>Planned scope</CardTitle>
            <CardDescription>
              This section is now part of the navigation so we can expand it
              gradually without changing the information architecture later.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pt-6">
            {bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border bg-muted/25 px-4 py-3">
                <p className="text-sm leading-6 text-foreground">{bullet}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/universities">Browse Universities</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
