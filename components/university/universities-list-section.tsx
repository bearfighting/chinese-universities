"use client";

import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import UniversityListCard, {
  type UniversityListItem,
} from "@/components/university/university-list-card";
import type { Locale } from "@/lib/i18n/config";
import type { AppDictionary } from "@/lib/i18n/dictionaries";

export type UniversityClassificationGroup = {
  code: string;
  name: string;
  fullName: string | null;
  description: string | null;
  universities: UniversityListItem[];
};

type Props = {
  dictionary: AppDictionary;
  groups: UniversityClassificationGroup[];
  locale: Locale;
};

export default function UniversitiesListSection({
  dictionary,
  groups,
  locale,
}: Props) {
  const [openGroup, setOpenGroup] = useState<string | undefined>(undefined);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function handleValueChange(value: string) {
    setOpenGroup(value || undefined);

    if (!value) {
      return;
    }

    const scrollToGroup = () => {
      const target = itemRefs.current[value];

      if (!target) {
        return;
      }

      const navbarOffset = 112;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });
    };

    // First pass after state change, then a second correction after the
    // accordion animation settles so lower sections land in the right place.
    window.setTimeout(scrollToGroup, 80);
    window.setTimeout(scrollToGroup, 260);
  }

  return (
    <Card>
      <CardHeader className="gap-3 border-b">
        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
          {dictionary.universities.listBadge}
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight">
          {dictionary.universities.listTitle}
        </h2>
        <CardDescription>
          {dictionary.universities.listDescription}
        </CardDescription>
      </CardHeader>

      <div className="px-6">
        <Accordion
          type="single"
          collapsible
          value={openGroup}
          onValueChange={handleValueChange}
        >
          {groups.map((group) => {
            return (
              <AccordionItem
                key={group.code}
                value={group.code}
                ref={(node) => {
                  itemRefs.current[group.code] = node;
                }}
                className="scroll-mt-28"
              >
                <AccordionTrigger className="py-6">
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-foreground">
                        {group.name}
                      </p>
                      {group.fullName ? (
                        <p className="text-sm font-medium text-foreground/70">
                          {group.fullName}
                        </p>
                      ) : null}
                      <p className="text-muted-foreground max-w-3xl text-sm leading-6">
                        {group.description ??
                          dictionary.universities.groupFallbackDescription}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="w-fit rounded-full px-3 py-1"
                    >
                      {group.universities.length}{" "}
                      {dictionary.universities.universitiesCount}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 pt-2 md:grid-cols-2 xl:grid-cols-3">
                    {group.universities.map((university, index) => (
                      <UniversityListCard
                        key={`${group.code}-${university.id}`}
                        dictionary={dictionary}
                        locale={locale}
                        university={university}
                        index={index}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </Card>
  );
}
