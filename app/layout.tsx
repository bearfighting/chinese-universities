import Navbar from "@/components/navbar";
import SiteBreadcrumbs from "@/components/site/site-breadcrumbs";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Study in Chinese university",
  description: "A help site for study in China",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans")}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SiteBreadcrumbs />
        {children}
      </body>
    </html>
  );
}
