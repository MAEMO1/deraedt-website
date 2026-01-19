import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, Crimson_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/structured-data";
import { SITE_CONFIG, COMPANY } from "@/lib/constants";
import "./globals.css";

// Dramatic serif for display - striking, editorial with high contrast
const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Clean geometric sans with personality
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Warm, elegant reading serif
const crimson = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "bouwbedrijf",
    "aannemer",
    "renovatie",
    "nieuwbouw",
    "erfgoedrenovatie",
    "België",
    "Oost-Vlaanderen",
    "Zele",
    "De Raedt",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <head>
        <StructuredData />
      </head>
      <body className={`${jakarta.variable} ${dmSerif.variable} ${crimson.variable} font-body antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
