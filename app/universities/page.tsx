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

const c9Universities = [
  {
    name: "Peking University",
    chineseName: "北京大学",
    city: "Beijing",
    slug: "peking-university",
    website: "https://www.pku.edu.cn",
  },
  {
    name: "Tsinghua University",
    chineseName: "清华大学",
    city: "Beijing",
    slug: "tsinghua-university",
    website: "https://www.tsinghua.edu.cn",
  },
  {
    name: "Fudan University",
    chineseName: "复旦大学",
    city: "Shanghai",
    slug: "fudan-university",
    website: "https://www.fudan.edu.cn",
  },
  {
    name: "Shanghai Jiao Tong University",
    chineseName: "上海交通大学",
    city: "Shanghai",
    slug: "shanghai-jiao-tong-university",
    website: "https://www.sjtu.edu.cn",
  },
  {
    name: "Nanjing University",
    chineseName: "南京大学",
    city: "Nanjing",
    slug: "nanjing-university",
    website: "https://www.nju.edu.cn",
  },
  {
    name: "Zhejiang University",
    chineseName: "浙江大学",
    city: "Hangzhou",
    slug: "zhejiang-university",
    website: "https://www.zju.edu.cn",
  },
  {
    name: "University of Science and Technology of China",
    chineseName: "中国科学技术大学",
    city: "Hefei",
    slug: "university-of-science-and-technology-of-china",
    website: "https://www.ustc.edu.cn",
  },
  {
    name: "Xi'an Jiaotong University",
    chineseName: "西安交通大学",
    city: "Xi'an",
    slug: "xian-jiaotong-university",
    website: "https://www.xjtu.edu.cn",
  },
  {
    name: "Harbin Institute of Technology",
    chineseName: "哈尔滨工业大学",
    city: "Harbin",
    slug: "harbin-institute-of-technology",
    website: "https://www.hit.edu.cn",
  },
];

export default function UniversitiesPage() {
  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            China Universities
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            C9 Universities of China
          </h1>
          <p className="text-muted-foreground text-base leading-7 sm:text-lg">
            The C9 League is often described as China&apos;s equivalent of the
            Ivy League. It brings together nine elite research universities and
            is a strong starting point for exploring top universities in China.
          </p>
        </div>

        <Card>
          <CardHeader className="gap-4 border-b">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">C9 League Members</CardTitle>
                <CardDescription>
                  Nine universities commonly grouped as the most prestigious
                  public research institutions in China.
                </CardDescription>
              </div>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                9 universities
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-3">
            {c9Universities.map((university, index) => (
              <Card key={university.name} className="bg-muted/30 shadow-none">
                <CardHeader className="gap-3">
                  <Badge variant="outline" className="w-fit">
                    {String(index + 1).padStart(2, "0")}
                  </Badge>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{university.name}</CardTitle>
                    <CardDescription className="text-base text-foreground/80">
                      {university.chineseName}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm font-medium">
                    City
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {university.city}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Site
                      </a>
                    </Button>
                    <Button asChild className="sm:flex-1">
                      <Link href={`/universities/${university.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
