export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];

  return segment && isLocale(segment) ? segment : defaultLocale;
}

export function localizeHref(locale: Locale, href: string) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) {
    return href;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function replacePathLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");

  if (segments[1] && isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return localizeHref(locale, pathname || "/");
}
