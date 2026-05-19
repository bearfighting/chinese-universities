import Image from "next/image";
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
    chineseName: "\u5317\u4eac\u5927\u5b66",
    city: "Beijing",
    slug: "peking-university",
    website: "https://www.pku.edu.cn",
    logo: "/pekin.png",
  },
  {
    name: "Tsinghua University",
    chineseName: "\u6e05\u534e\u5927\u5b66",
    city: "Beijing",
    slug: "tsinghua-university",
    website: "https://www.tsinghua.edu.cn",
    logo: "/tsinghua.png",
  },
  {
    name: "Fudan University",
    chineseName: "\u590d\u65e6\u5927\u5b66",
    city: "Shanghai",
    slug: "fudan-university",
    website: "https://www.fudan.edu.cn",
    logo: "/fudan.png",
  },
  {
    name: "Shanghai Jiao Tong University",
    chineseName: "\u4e0a\u6d77\u4ea4\u901a\u5927\u5b66",
    city: "Shanghai",
    slug: "shanghai-jiao-tong-university",
    website: "https://www.sjtu.edu.cn",
    logo: "/shanghai-jiaotong.png",
  },
  {
    name: "Nanjing University",
    chineseName: "\u5357\u4eac\u5927\u5b66",
    city: "Nanjing",
    slug: "nanjing-university",
    website: "https://www.nju.edu.cn",
    logo: "/nanjing.png",
  },
  {
    name: "Zhejiang University",
    chineseName: "\u6d59\u6c5f\u5927\u5b66",
    city: "Hangzhou",
    slug: "zhejiang-university",
    website: "https://www.zju.edu.cn",
    logo: "/zhejiang.png",
  },
  {
    name: "University of Science and Technology of China",
    chineseName: "\u4e2d\u56fd\u79d1\u5b66\u6280\u672f\u5927\u5b66",
    city: "Hefei",
    slug: "university-of-science-and-technology-of-china",
    website: "https://www.ustc.edu.cn",
    logo: "/ustc.png",
  },
  {
    name: "Xi'an Jiaotong University",
    chineseName: "\u897f\u5b89\u4ea4\u901a\u5927\u5b66",
    city: "Xi'an",
    slug: "xian-jiaotong-university",
    website: "https://www.xjtu.edu.cn",
    logo: "/xjtu.svg",
  },
  {
    name: "Harbin Institute of Technology",
    chineseName: "\u54c8\u5c14\u6ee8\u5de5\u4e1a\u5927\u5b66",
    city: "Harbin",
    slug: "harbin-institute-of-technology",
    website: "https://www.hit.edu.cn",
    logo: "/hit.svg",
  },
] as const;

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
                  <div className="flex h-24 items-center justify-center rounded-2xl border bg-background/80 p-4">
                    <Image
                      src={university.logo}
                      alt={`${university.name} logo`}
                      width={180}
                      height={80}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
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
