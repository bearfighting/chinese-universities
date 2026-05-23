"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getLocaleFromPathname,
  localizeHref,
  replacePathLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const navigation = [
    { href: "/universities", label: dictionary.nav.links.universities },
    { href: "/rankings", label: dictionary.nav.links.rankings },
    { href: "/locations", label: dictionary.nav.links.locations },
    { href: "/majors", label: dictionary.nav.links.majors },
    { href: "/scholarships", label: dictionary.nav.links.scholarships },
    { href: "/guides", label: dictionary.nav.links.guides },
    { href: "/blog", label: dictionary.nav.links.blog },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto hidden min-h-18 w-full max-w-[96rem] items-center gap-4 px-5 py-3 xl:flex 2xl:px-6">
        <BrandLockup detailed locale={locale} />

        <nav className="min-w-0 flex-[1.15]">
          <div className="flex items-center justify-center rounded-full border border-border/80 bg-background/92 p-1 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            {navigation.map((item) => {
              const localizedHref = localizeHref(locale, item.href);
              const isActive =
                pathname === localizedHref ||
                pathname.startsWith(`${localizedHref}/`);

              return (
                <Link
                  key={item.href}
                  href={localizedHref}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-all 2xl:px-4.5",
                    isActive
                      ? "bg-secondary text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitch locale={locale} pathname={pathname} />
          <div className="w-full max-w-[22rem] 2xl:max-w-[24rem]">
            <SearchChrome
              href={localizeHref(locale, "/search")}
              locale={locale}
              placeholder={dictionary.nav.searchPlaceholder}
              compact={false}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-18 w-full max-w-[96rem] items-center justify-between gap-3 px-4 py-3 xl:hidden">
        <BrandLockup locale={locale} />

        <div className="min-w-0 flex-1 md:max-w-[min(42rem,calc(100%-4.5rem))]">
          <SearchChrome
            href={localizeHref(locale, "/search")}
            locale={locale}
            placeholder={dictionary.nav.searchPlaceholder}
            compact
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-11 shrink-0 rounded-full border-border/80 bg-background/92 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
              aria-label={dictionary.nav.openNavigationMenu}
            >
              <span className="text-lg leading-none">☰</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>{dictionary.nav.navigate}</DropdownMenuLabel>
            {navigation.map((item) => {
              const localizedHref = localizeHref(locale, item.href);
              const isActive =
                pathname === localizedHref ||
                pathname.startsWith(`${localizedHref}/`);

              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={localizedHref}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl",
                      isActive ? "bg-muted text-foreground" : "text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        {dictionary.nav.current}
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={localizeHref(locale, "/search")} className="rounded-xl">
                {dictionary.nav.searchLabel}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>{dictionary.nav.language}</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={replacePathLocale(pathname, "en")} className="rounded-xl">
                {dictionary.nav.english}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={replacePathLocale(pathname, "zh")} className="rounded-xl">
                {dictionary.nav.chinese}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function BrandLockup({
  detailed = false,
  locale,
}: {
  detailed?: boolean;
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);

  return (
    <Link
      href={localizeHref(locale, "/")}
      className="flex shrink-0 items-center gap-3 rounded-xl px-1 py-1 outline-none transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label={detailed ? undefined : dictionary.nav.brandTitle}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-md",
          detailed ? "h-12 w-12 2xl:h-13 2xl:w-13" : "h-11 w-11",
        )}
      >
        <Image
          src="/chinese-universities-logo.png"
          alt=""
          fill
          sizes={detailed ? "52px" : "44px"}
          className="object-contain"
        />
      </div>
      {detailed ? (
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {dictionary.nav.brandTitle}
          </p>
          <p className="text-muted-foreground text-xs">
            {dictionary.nav.brandSubtitle}
          </p>
        </div>
      ) : null}
    </Link>
  );
}

function SearchChrome({
  href,
  locale,
  placeholder,
  compact,
}: {
  href: string;
  locale: Locale;
  placeholder: string;
  compact: boolean;
}) {
  const dictionary = getDictionary(locale);

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 overflow-hidden rounded-full border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,246,246,0.94))] text-sm text-muted-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-px hover:border-border hover:text-foreground hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
        compact ? "h-11 px-3.5" : "h-11 px-4",
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[radial-gradient(circle_at_left,rgba(15,23,42,0.05),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-muted/80 text-foreground/70 transition-colors group-hover:bg-muted group-hover:text-foreground">
        <SearchIcon />
      </span>
      <span className="relative min-w-0 flex-1 truncate">
        {compact ? (
          <>
            <span className="truncate sm:hidden">
              {dictionary.nav.searchLabel}
            </span>
            <span className="hidden truncate sm:block md:hidden">
              {dictionary.nav.searchShort}
            </span>
            <span className="hidden truncate md:block">{placeholder}</span>
          </>
        ) : (
          <span className="flex items-center gap-2">
            <span className="font-medium text-foreground/85">
              {dictionary.nav.searchLabel}
            </span>
            <span className="truncate text-muted-foreground/95">
              {placeholder}
            </span>
          </span>
        )}
      </span>
      <span className="hidden h-5 w-px shrink-0 bg-border/80 2xl:block" />
      {!compact ? (
        <span className="hidden items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2 py-1 text-[11px] font-medium tracking-[0.08em] text-muted-foreground 2xl:inline-flex">
          <kbd className="rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-foreground/80">
            Ctrl
          </kbd>
          <kbd className="rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-foreground/80">
            K
          </kbd>
        </span>
      ) : null}
      {compact ? (
        <span className="hidden items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-medium tracking-[0.08em] text-muted-foreground lg:inline-flex xl:hidden">
          <span className="size-1.5 rounded-full bg-emerald-500/70" />
          Open
        </span>
      ) : null}
    </Link>
  );
}

function LanguageSwitch({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  const dictionary = getDictionary(locale);

  return (
    <div
      className="inline-flex items-center rounded-full border border-border/80 bg-background/92 p-1 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
      aria-label={dictionary.nav.language}
    >
      {(["en", "zh"] as const).map((targetLocale) => {
        const isActive = locale === targetLocale;

        return (
          <Link
            key={targetLocale}
            href={replacePathLocale(pathname, targetLocale)}
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-secondary text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {targetLocale === "en"
              ? dictionary.nav.english
              : dictionary.nav.chinese}
          </Link>
        );
      })}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
