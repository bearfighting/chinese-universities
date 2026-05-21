import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UniversityListCard, {
  type UniversityListItem,
} from "@/components/university/university-list-card";

type Props = {
  universities: UniversityListItem[];
};

export default function UniversitiesListSection({ universities }: Props) {
  return (
    <Card>
      <CardHeader className="gap-4 border-b">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">C9 League Members</CardTitle>
            <CardDescription>
              Nine universities commonly grouped as the most prestigious public
              research institutions in China.
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
            {universities.length} universities
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-3">
        {universities.map((university, index) => (
          <UniversityListCard
            key={university.id}
            university={university}
            index={index}
          />
        ))}
      </CardContent>
    </Card>
  );
}
