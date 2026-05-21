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
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNavigation = [
  { href: "/universities", label: "Universities" },
  { href: "/rankings", label: "Rankings" },
  { href: "/locations", label: "Locations" },
  { href: "/majors", label: "Majors" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto hidden min-h-18 max-w-7xl items-center gap-6 px-4 py-3 lg:flex">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-xl px-1 py-1 outline-none transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Chinese Universities home"
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-16">
            <Image
              src="/chinese-universities-logo.png"
              alt="Chinese Universities logo"
              fill
              sizes="(max-width: 640px) 56px, 64px"
              className="object-contain"
            />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Chinese Universities
            </p>
            <p className="text-muted-foreground text-xs">
              Explore, compare, and plan your study path
            </p>
          </div>
        </Link>

        <nav className="min-w-0 flex-1 items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border bg-background/90 p-1">
            {primaryNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto">
          <Button asChild variant="outline" className="rounded-full px-4">
            <Link href="/search">Search</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto flex min-h-18 max-w-7xl items-center gap-3 px-4 py-3 lg:hidden">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-xl px-1 py-1 outline-none transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Chinese Universities home"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src="/chinese-universities-logo.png"
              alt="Chinese Universities logo"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href="/search"
            className="flex h-11 items-center justify-center rounded-full border bg-background px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Search universities, rankings, cities...
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full"
              aria-label="Open navigation menu"
            >
              <span className="text-lg leading-none">≡</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Navigate</DropdownMenuLabel>
            {primaryNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl",
                      isActive ? "bg-muted text-foreground" : "text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        Current
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/search" className="rounded-xl">
                Search
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
