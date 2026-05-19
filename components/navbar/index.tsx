"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isUniversitiesActive = pathname.startsWith("/universities");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-1 py-1 outline-none transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
              Explore top universities in China
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList className="list-none flex gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={isUniversitiesActive}
                  className={cn(
                    "rounded-full border border-transparent px-4 py-2 font-medium transition-colors focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isUniversitiesActive
                      ? "border-border bg-secondary text-foreground hover:bg-secondary"
                      : "text-muted-foreground hover:border-border/60 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Link
                    href="/universities"
                    aria-current={isUniversitiesActive ? "page" : undefined}
                  >
                    Universities
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
