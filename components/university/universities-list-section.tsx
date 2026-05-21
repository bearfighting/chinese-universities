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
  CardTitle,
} from "@/components/ui/card";

import UniversityListCard, {
  type UniversityListItem,
} from "@/components/university/university-list-card";

export type UniversityClassificationGroup = {
  code: string;
  name: string;
  description: string | null;
  universities: UniversityListItem[];
};

type Props = {
  groups: UniversityClassificationGroup[];
};

export default function UniversitiesListSection({ groups }: Props) {
  return (
    <Card>
      <CardHeader className="gap-3 border-b">
        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
          Classifications
        </Badge>
        <CardTitle className="text-2xl">Browse universities by category</CardTitle>
        <CardDescription>
          Open one classification at a time to compare schools inside that
          group. This keeps the page compact now and scales better as more
          universities are added.
        </CardDescription>
      </CardHeader>

      <div className="px-6">
        <Accordion type="single" collapsible defaultValue={groups[0]?.code}>
          {groups.map((group) => (
            <AccordionItem key={group.code} value={group.code}>
              <AccordionTrigger className="py-6">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">
                      {group.name}
                    </p>
                    <p className="text-muted-foreground max-w-3xl text-sm leading-6">
                      {group.description ?? "University classification group"}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit rounded-full px-3 py-1"
                  >
                    {group.universities.length} universities
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pt-2 md:grid-cols-2 xl:grid-cols-3">
                  {group.universities.map((university, index) => (
                    <UniversityListCard
                      key={`${group.code}-${university.id}`}
                      university={university}
                      index={index}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  );
}
