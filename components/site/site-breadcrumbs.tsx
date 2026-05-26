"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getLocaleFromPathname,
  localizeHref,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Crumb = {
  href: string;
  label: string;
  isCurrent: boolean;
};

const STATIC_SEGMENT_LABELS = {
  universities: (locale: Locale) => getDictionary(locale).nav.links.universities,
  rankings: (locale: Locale) => getDictionary(locale).nav.links.rankings,
  locations: (locale: Locale) => getDictionary(locale).nav.links.locations,
  majors: (locale: Locale) => getDictionary(locale).nav.links.majors,
  scholarships: (locale: Locale) => getDictionary(locale).nav.links.scholarships,
  guides: (locale: Locale) => getDictionary(locale).nav.links.guides,
  blog: (locale: Locale) => getDictionary(locale).nav.links.blog,
  search: (locale: Locale) => getDictionary(locale).nav.searchLabel,
} satisfies Record<string, (locale: Locale) => string>;

export default function SiteBreadcrumbs() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const homeHref = localizeHref(locale, "/");
  const homeLabel = locale === "zh" ? "\u9996\u9875" : "Home";

  if (pathname === homeHref || pathname === "/") {
    return null;
  }

  const crumbs = buildBreadcrumbs(pathname, locale);

  return (
    <div className="border-b border-border/60 bg-background/94 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-10 lg:px-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href={homeHref}
                className="rounded-md transition-colors hover:text-foreground"
              >
                {homeLabel}
              </Link>
            </li>

            {crumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-border">
                  /
                </span>
                {crumb.isCurrent ? (
                  <span
                    aria-current="page"
                    className="font-medium text-foreground"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="rounded-md transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

function buildBreadcrumbs(pathname: string, locale: Locale): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const pathSegments =
    segments[0] === locale ? segments.slice(1) : segments;

  return pathSegments.map((segment, index) => {
    const href = localizeHref(
      locale,
      `/${pathSegments.slice(0, index + 1).join("/")}`,
    );

    return {
      href,
      label: getSegmentLabel(segment, locale),
      isCurrent: index === pathSegments.length - 1,
    };
  });
}

function getSegmentLabel(segment: string, locale: Locale) {
  const staticLabel = STATIC_SEGMENT_LABELS[segment];

  if (staticLabel) {
    return staticLabel(locale);
  }

  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
